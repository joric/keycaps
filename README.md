Keycaps
=======

Keyboard layout editor and renderer

##Models

OpenSCAD models taken from https://github.com/rsheldiii/openSCAD-projects and slightly edited in Blender,
then exported using THREEjs JSON exporter into a JSON scene.

Mind that OpenSCAD rendering to .STL takes a lot of time, especially for SA (spherical) geometry (takes about 30 minutes),
while DCS is rendered in a few seconds (see utils directory).

Rendered .STL are then processed with Blender's Decimate and Edge Split modifiers
(Auto Smooth settings for normals doesn't get exported so I had to use Edge Split).
UVs can be assigned too, though I'm not yet sure which mapping to use.

There's also a 2D editor, images taken from https://github.com/CQCumbers/kle_render.

All copyrights to resource files belong to their respective owners.


