"""
services/geo_service.py — GPS extraction and reverse geocoding.

Uses Pillow to read EXIF data from JPEG/PNG images.
Converts GPS rational values to decimal degrees.
Reverse-geocodes via OpenStreetMap Nominatim (no API key needed).
"""

from __future__ import annotations
from typing import Optional, Tuple
import urllib.request
import urllib.parse
import json

try:
    from PIL import Image as PILImage
    from PIL.ExifTags import TAGS, GPSTAGS
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False


def _rational_to_float(value) -> float:
    """Convert a PIL IFDRational or (numerator, denominator) to float."""
    if hasattr(value, "numerator"):
        return value.numerator / value.denominator
    return value[0] / value[1]


def _dms_to_decimal(dms, ref: str) -> float:
    """Degrees/Minutes/Seconds → decimal degrees."""
    degrees = _rational_to_float(dms[0])
    minutes = _rational_to_float(dms[1])
    seconds = _rational_to_float(dms[2])
    decimal = degrees + minutes / 60 + seconds / 3600
    if ref in ("S", "W"):
        decimal = -decimal
    return decimal


def extract_gps(image_path: str) -> Tuple[Optional[float], Optional[float]]:
    """
    Extract latitude and longitude from an image's EXIF GPS block.

    Returns (latitude, longitude) or (None, None) if unavailable.
    """
    if not PIL_AVAILABLE:
        return None, None

    try:
        img  = PILImage.open(image_path)
        exif = img._getexif()
        if exif is None:
            return None, None

        gps_info: dict = {}
        for tag_id, value in exif.items():
            tag = TAGS.get(tag_id, tag_id)
            if tag == "GPSInfo":
                for gps_tag_id, gps_value in value.items():
                    gps_tag = GPSTAGS.get(gps_tag_id, gps_tag_id)
                    gps_info[gps_tag] = gps_value

        if not gps_info:
            return None, None

        lat = _dms_to_decimal(gps_info["GPSLatitude"],  gps_info.get("GPSLatitudeRef",  "N"))
        lon = _dms_to_decimal(gps_info["GPSLongitude"], gps_info.get("GPSLongitudeRef", "E"))
        return lat, lon

    except Exception as exc:
        print(f"[GeoService] EXIF read error: {exc}")
        return None, None


def reverse_geocode(lat: float, lon: float) -> str:
    """
    Convert decimal GPS coordinates to a readable location string
    using the OSM Nominatim API (no key required).
    """
    try:
        params  = urllib.parse.urlencode({"lat": lat, "lon": lon, "format": "json"})
        url     = f"https://nominatim.openstreetmap.org/reverse?{params}"
        headers = {"User-Agent": "InstitutionalDocGen/1.0"}
        req     = urllib.request.Request(url, headers=headers)

        with urllib.request.urlopen(req, timeout=5) as resp:
            data = json.loads(resp.read())

        address = data.get("address", {})
        parts   = [
            address.get("village") or address.get("suburb") or address.get("city_district"),
            address.get("city")    or address.get("town"),
            address.get("state"),
            address.get("country"),
        ]
        return ", ".join(p for p in parts if p)

    except Exception as exc:
        print(f"[GeoService] Reverse geocode error: {exc}")
        return f"{lat:.4f}° N, {lon:.4f}° E"
