#images from https://github.com/CQCumbers/kle_render

import os

for fn in os.listdir('.'):
    if os.path.isfile(fn) and fn.endswith('.png'):
        print '<img id="%s" src="images/%s"/>' % (fn.rsplit('.',1)[0], fn)
