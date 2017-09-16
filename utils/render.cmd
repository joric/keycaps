@echo off
set path=D:\Shared\Tools\Graphics\OpenSCAD\openscad-2015.03-2;%path%

::key_v2 taken from https://github.com/rsheldiii/openSCAD-projects
::render.scad added for rendering
cd key_v2

echo rendering...

echo start time: %time%

::takes about 37 seconds a key
::openscad.exe -Dprofile=0 -Drow=1 -o ..\render\dcs_row_1.stl render.scad
::openscad.exe -Dprofile=0 -Drow=2 -o ..\render\dcs_row_2.stl render.scad
::openscad.exe -Dprofile=0 -Drow=3 -o ..\render\dcs_row_3.stl render.scad
::openscad.exe -Dprofile=0 -Drow=4 -o ..\render\dcs_row_4.stl render.scad

::takes about 20 minutes a key
::openscad.exe -Dprofile=1 -Drow=3 -o ..\render\dsa_row_3.stl render.scad

::takes 27,21,19 and 35 minutes respectively
::openscad.exe -Dprofile=2 -Drow=1 -o ..\render\sa_row_1.stl render.scad
::openscad.exe -Dprofile=2 -Drow=2 -o ..\render\sa_row_2.stl render.scad
::openscad.exe -Dprofile=2 -Drow=3 -o ..\render\sa_row_3.stl render.scad
::openscad.exe -Dprofile=2 -Drow=4 -o ..\render\sa_row_4.stl render.scad

::takes about 12 seconds a key
::openscad.exe -Dprofile=3 -Drow=1 -o ..\render\g20.stl render.scad
::openscad.exe -Dprofile=3 -Drow=3 -o ..\render\g20_row_3.stl render.scad

echo end time: %time%

