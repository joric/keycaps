@echo off

set path=C:\Program Files\Blender Foundation\Blender;%path%

set script=D:\lib\three.js\utils\exporters\blender\tests\scripts\exporter.py
set blend=%~dp0\blender\keycaps.blend
set json=%~dp0\..\models\keycaps.json

del %json%

echo exporting scene...

blender %blend% --background --python %script% -- %json% --vertices --faces --normals --scene --lights --materials --uvs --embedGeometry --geometryType BufferGeometry --cameras >nul 2>&1

if exist "%json%" goto success

echo error on exporting (editmode enabled? forgot to save file?)
pause
goto end

:success

set tmpfile=tmp.$$$

echo data= > %tmpfile%
type %json% >> %tmpfile%
type %tmpfile% > %json%
del %tmpfile%

cd /d %~dp0\..

start index.html

:end
