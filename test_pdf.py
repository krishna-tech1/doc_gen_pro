import traceback
import sys
from docx2pdf import convert

try:
    convert('backend/generated/circular_f2596443.docx', 'test.pdf')
    print('Success')
except Exception as e:
    print('Error:')
    traceback.print_exc()
