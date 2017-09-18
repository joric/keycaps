Keycaps
=======

Keyboard layout editor and renderer

Models
------

OpenSCAD models taken from https://github.com/rsheldiii/openSCAD-projects and slightly edited in Blender,
then exported using THREEjs JSON exporter into a JSON scene.

Mind that OpenSCAD rendering to .STL takes a lot of time, especially for SA (spherical) geometry (takes about 30 minutes),
while DCS is rendered in a few seconds (see utils directory).

Rendered .STL are then processed with Blender's Decimate and Edge Split modifiers
(Auto Smooth settings do not affect exported normals so I had to use Edge Split).
Texture UVs assigned from Blender, using "Project from View (Bounds)" for visible geometry.

There's also a 2D editor, images taken from https://github.com/CQCumbers/kle_render.

Also some ideas are taken from repository: https://github.com/getclacking/SA-profile-keys-3D-models

All copyrights to resource files belong to their respective owners.

