@echo off
START cmd /k "C:\Users\BCA 36\AppData\Local\Programs\Python\Python312\python.exe backend\run_server.py"
START cmd /k "set PATH=C:\Program Files\nodejs;%%PATH%% && cd frontend && npm run dev"
