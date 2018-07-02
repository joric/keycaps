@echo off

set path=C:\Program Files\Blender Foundation\Blender;%path%

set script=D:\lib\three.js\utils\exporters\blender\tests\scripts\exporter.py
set blend=%~dp0\blender\keycaps.blend
set json=%~dp0\..\models\keycaps.json

del %json%

echo exporting scene...

blender %blend% --background --python %script% -- %json% --vertices --faces --normals --scene --bones --hierarchy --lights --materials --uvs --embedGeometry --geometryType BufferGeometry --cameras >nul 2>&1

if exist "%json%" goto success

echo error on exporting (editmode enabled? forgot to save file? did not copy addon scripts)

rem don't forget to copy addon scripts (three r87) and enable them in settings, something like:
rem xcopy %threejs%\utils\exporters\blender\addons\io_three %blender%\scripts\addons

pause
goto end

:success

set tmpfile=tmp.$$$

echo data= > %tmpfile%
type %json% >> %tmpfile%
type %tmpfile% > %json%
del %tmpfile%

cd /d %~dp0\..

rem start index.html - fails in chrome now

:end
