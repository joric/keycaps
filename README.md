# Keycaps

Keyboard layout editor and renderer


## Software

OpenSCAD is used for prototyping. Objects are rendered by THREEjs with JSON scene exported from Blender.

### OpenSCAD

OpenSCAD models rendered into .stl and slightly edited in Blender, then exported using THREEjs JSON exporter.
Mind that [key_v2](https://github.com/rsheldiii/openSCAD-projects) OpenSCAD set takes a lot of time
to render, especially for SA (spherical) geometry - takes about 30 minutes a key,
while DCS is rendered in a few seconds (see utils directory). Rendering time can be reduced with smaller subdivision ($fn) settings.


### Blender

Rendered .stl files are then processed with Blender's "Decimate" and "Edge Split" modifiers.
Smoothing groups ("Auto Smooth") do not get exported so I had to use Edge Split geometry modifier.
Texture UVs assigned from Blender, using ""Project from View" and "Project from View (Bounds)" for visible geometry.
All modifer stacks should be collapsed for proper exporting.


## License

MIT

All copyrights to resource files belong to their respective owners.


## References

* JavaScript 3D library https://github.com/mrdoob/three.js
* OpenSCAD models: https://github.com/rsheldiii/openSCAD-projects
* OpenSCAD models: https://github.com/getclacking/SA-profile-keys-3D-models
* Prerendered images: https://github.com/CQCumbers/kle_render


