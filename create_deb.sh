#! /usr/bin/env bash
PROGRAM_NAME=sdlhmi
VERSION=6.1.0
PROGRAM_NAME=$PROGRAM_NAME-$VERSION

rm -rf $PROGRAM_NAME
mkdir $PROGRAM_NAME
cp -r  deb/* $PROGRAM_NAME/
mkdir -p $PROGRAM_NAME/usr/bin/
mkdir -p $PROGRAM_NAME/usr/share/sdlhmi
mkdir -p $PROGRAM_NAME/usr/share/doc/sdlhmi
cp sdlhmi $PROGRAM_NAME/usr/bin/
mv * $PROGRAM_NAME/usr/share/sdlhmi/; cp -r $PROGRAM_NAME/usr/share/sdlhmi/* .
gzip -9 --keep --stdout $PROGRAM_NAME/DEBIAN/changelog >  \
	                 $PROGRAM_NAME/usr/share/doc/sdlhmi/changelog.gz
cp $PROGRAM_NAME/DEBIAN/copyright $PROGRAM_NAME/usr/share/doc/sdlhmi/
#(cd $PROGRAM_NAME; md5deep -r usr > DEBIAN/md5sums)
fakeroot dpkg-deb --build $PROGRAM_NAME
lintian $PROGRAM_NAME.deb

