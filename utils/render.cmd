@echo off
set path=D:\Shared\Tools\Graphics\OpenSCAD\openscad-2015.03-2;%path%

::key_v2 taken from https://github.com/rsheldiii/openSCAD-projects
::render.scad added for rendering
cd key_v2

echo rendering...

echo start time: %time%

goto sa_mods

:dcs
openscad.exe -Dprofile=0 -Drow=1 -o "..\render\DCS R1.stl" render.scad
openscad.exe -Dprofile=0 -Drow=2 -o "..\render\DCS R2.stl" render.scad
openscad.exe -Dprofile=0 -Drow=3 -o "..\render\DCS R3.stl" render.scad
openscad.exe -Dprofile=0 -Drow=4 -o "..\render\DCS R4.stl" render.scad

:dcs_mods
openscad.exe -Dprofile=0 -Drow=1 -Dw=2.0 -o "..\render\DCS R1 2.stl" render.scad
openscad.exe -Dprofile=0 -Drow=2 -Dw=1.5 -o "..\render\DCS R2 1.5.stl" render.scad
openscad.exe -Dprofile=0 -Drow=3 -Dw=1.75 -o "..\render\DCS R3 1.75.stl" render.scad
openscad.exe -Dprofile=0 -Drow=3 -Dw=2.25 -o "..\render\DCS R3 2.25.stl" render.scad
openscad.exe -Dprofile=0 -Drow=4 -Dw=2.25 -o "..\render\DCS R4 2.25.stl" render.scad
openscad.exe -Dprofile=0 -Drow=4 -Dw=2.75 -o "..\render\DCS R4 2.75.stl" render.scad
openscad.exe -Dprofile=0 -Drow=4 -Dw=1.25 -o "..\render\DCS R4 1.25.stl" render.scad
openscad.exe -Dprofile=1 -Dspacebar=1 -Drow=1 -o "..\render\DCS SPACE.stl" render.scad

:dsa
openscad.exe -Dprofile=1 -Drow=1 -o ..\render\DSA R1.stl render.scad

:g20
openscad.exe -Dprofile=3 -Drow=1 -o "..\render\G20 R1.stl" render.scad
openscad.exe -Dprofile=3 -Drow=3 -o "..\render\G20 R3.stl" render.scad

:sa
openscad.exe -Dprofile=2 -Drow=1 -o "..\render\SA R1.stl" render.scad
openscad.exe -Dprofile=2 -Drow=2 -o "..\render\SA R2.stl" render.scad
openscad.exe -Dprofile=2 -Drow=3 -o "..\render\SA R3.stl" render.scad
openscad.exe -Dprofile=2 -Drow=4 -o "..\render\SA R4.stl" render.scad

:sa_mods
openscad.exe -Dprofile=2 -Drow=1 -Dw=2.0 -o "..\render\SA R1 2.stl" render.scad
openscad.exe -Dprofile=2 -Drow=2 -Dw=1.5 -o "..\render\SA R2 1.5.stl" render.scad
openscad.exe -Dprofile=2 -Drow=3 -Dw=1.75 -o "..\render\SA R3 1.75.stl" render.scad
openscad.exe -Dprofile=2 -Drow=3 -Dw=2.25 -o "..\render\SA R3 2.25.stl" render.scad
openscad.exe -Dprofile=2 -Drow=4 -Dw=2.25 -o "..\render\SA R4 2.25.stl" render.scad
openscad.exe -Dprofile=2 -Drow=4 -Dw=2.75 -o "..\render\SA R4 2.75.stl" render.scad
openscad.exe -Dprofile=2 -Drow=4 -Dw=1.25 -o "..\render\SA R4 1.25.stl" render.scad
goto end
openscad.exe -Dspacebar=1 -Dprofile=2 -Drow=3 -o "..\render\SA SPACE.stl" render.scad


:end
echo end time: %time%

