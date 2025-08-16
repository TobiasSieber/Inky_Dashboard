#!/usr/bin/env python3

import argparse
import pathlib
import sys

from PIL import Image
from inky.auto import auto
from RandomizePictures import GetNewPicture


_newImage = GetNewPicture()
print(_newImage)


inky = auto(ask_user=True, verbose=True)


if not _newImage:
    print(f"""Usage:
    {sys.argv[0]} --file image.png (--saturation 0.5)""")
    sys.exit(1)



_imagePath =(f"/home/topi/Weather/plugins/Diashow/Pictures/Demo-Pictures/{_newImage}")
print(_imagePath)
image = Image.open(_imagePath)
image = image.transpose(Image.ROTATE_90)

resizedimage = image.resize(inky.resolution)

try:
    inky.set_image(resizedimage, saturation=0.5)
except TypeError:
    inky.set_image(resizedimage)

inky.show()
