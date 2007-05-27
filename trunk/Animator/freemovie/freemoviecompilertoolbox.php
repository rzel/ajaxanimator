<?php

//---------------------------------------------------------------
//  file flashmoviecompilertoolbox.php

//---------------------------------------------------------------
//  FreeMovieCompilerToolbox -- a high-level interface to the 
//                                       FreeMovieCompiler class 
//  Copyright (C) 2001 Jacek Artymiak
//
//  Permission is hereby granted, free of charge, to any person
//  obtaining a copy of this software and associated
//  documentation files (the "Software"), to deal in the Software
//  without restriction, including without limitation the rights
//  to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to
//  whom the Software is furnished to do so, subject to the
//  following conditions:
//
//  The above copyright notice and this permission notice shall
//  be included in all copies or substantial portions of the
//  Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
//  KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
//  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
//  PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL JACEK
//  ARTYMIAK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
//  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
//  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
//  Except as contained in this notice, the name of Jacek Artymiak
//  shall not be used in advertising or otherwise to promote the
//  sale, use or other dealings in this Software without prior
//  written authorization from Jacek Artymiak.
//
//  For more information write to jacek@artymiak.com or
//  artymiak@safenet.pl. Failing that visit
//  http://freemovie.sourceforge.net or http://www.devguide.net
//
//  Mailing address:
//  ----------------
//  Jacek Artymiak
//  P.O. Box 69
//  Lublin 1
//  Lublin
//  20-001
//  woj. lubelskie
//  POLAND

//---------------------------------------------------------------
//  Class FreeMovieCompilerToolbox defines a set of handy 
//  functions that provide an easy to use interface to the 
//  FreeMovieCompiler class.

require_once("freemoviecompiler.php");

class FreeMovieCompilerToolbox extends FreeMovieCompiler
{
	var $Shape = array();

        var $Cal_mode = true;

	//--------------------------------------------------
	//
	//  SWF file utility functions
	//
	//--------------------------------------------------

	//--------------------------------------------------
	//  integer SetSWFVersion(integer version)
	//  sets the SWF file version number to $version and
	//  returns that version.
	//
	//  NOTE: call this function right before the call
	//        to EndMovie() to override changes made by
	//        calls to AutoSetSWFVersion() (fmcompiler).

	function SetSWFVersion($version)
	{
		array_push($this->FMDebug, "SetSWFVersion");

		if (($version < $this->SWFVersionLowerLimit) or ($version > $this->SWFVersionUpperLimit)) {

			$this->FMError("SetSWFVersion argument (version) out of range");
		} else {

			$this->SWFVersion = (int) $version;
		}

		array_pop($this->FMDebug);

		return $this->SWFVersion;
	} 

	//--------------------------------------------------
	//  integer GetSWFVersion()
	//  returns the SWF file version number set by
	//  AutoSetSWFVersion() (fmcompiler) and 
	//  SetSWFVersion() (fmcompilertoolbox).  Does not
	//  change the current SWF file version number.

	function GetSWFVersion()
	{
		array_push($this->FMDebug, "SetSWFVersion");

		array_pop($this->FMDebug);

		return $this->SWFVersion;
	} 

	//--------------------------------------------------
	//  array SetFrameSize(integer Xmax, integer Ymax)
	//  sets the Flash movie frame size and returns the
	//  array holding the new frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSize($Xmax, $Ymax)
	{
		array_push($this->FMDebug, "SetFrameSize");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = (int) $Xmax;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = (int) $Ymax;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABButton1()
	//  sets the Flash movie frame size to IAB Button 1
	//  and returns the array holding the new frame 
	//  size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABButton1()
	{
		array_push($this->FMDebug, "SetFrameSizeIABButton1");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 120 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 90 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABButton2()
	//  sets the Flash movie frame size to IAB Button 2
	//  and returns the array holding the new frame 
	//  size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABButton2()
	{
		array_push($this->FMDebug, "SetFrameSizeIABButton2");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 120 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 60 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABFullBanner()
	//  sets the Flash movie frame size to IAB Full
	//  Banner and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABFullBanner()
	{
		array_push($this->FMDebug, "SetFrameSizeIABFullBanner");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 468 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 60 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABHalfBanner()
	//  sets the Flash movie frame size to IAB Half
	//  Banner and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABHalfBanner()
	{
		array_push($this->FMDebug, "SetFrameSizeIABHalfBanner");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 234 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 60 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABLargeRectangle()
	//  sets the Flash movie frame size to IAB Large
	//  Rectangle and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABLargeRectangle()
	{
		array_push($this->FMDebug, "SetFrameSizeIABLargeRectangle");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 336 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 280 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABMediumRectangle()
	//  sets the Flash movie frame size to IAB Medium 
	//  Rectangle and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABMediumRectangle()
	{
		array_push($this->FMDebug, "SetFrameSizeIABMediumRectangle");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 300 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 250 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABMicroBar()
	//  sets the Flash movie frame size to IAB Micro 
	//  Bar and returns the array holding the new frame
	//  size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABMicroBar()
	{
		array_push($this->FMDebug, "SetFrameSizeIABMicroBar");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 88 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 31 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABRectangle()
	//  sets the Flash movie frame size to IAB Rectangle 
	//  and returns the array holding the new frame
	//  size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABRectangle()
	{
		array_push($this->FMDebug, "SetFrameSizeIABRectangle");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 180 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 150 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABRectangle()
	//  sets the Flash movie frame size to IAB Rectangle 
	//  and returns the array holding the new frame
	//  size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

//.[cal]	function SetFrameSizeIABRectangle()
//	{
//		array_push($this->FMDebug, "SetFrameSizeIABRectangle");

//		$this->FrameSize["Xmin"] = 0;
//		$this->FrameSize["Xmax"] = 180 * 20;
//		$this->FrameSize["Ymin"] = 0;
//		$this->FrameSize["Ymax"] = 150 * 20;

//		array_pop($this->FMDebug);

//		return $this->FrameSize;
//[cal].	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABSkyscraper()
	//  sets the Flash movie frame size to IAB
	//  Skyscraper and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABSkyscraper()
	{
		array_push($this->FMDebug, "SetFrameSizeIABSkyscraper");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 120 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 600 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABSquareButton()
	//  sets the Flash movie frame size to IAB Square
	//  Button and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABSquareButton()
	{
		array_push($this->FMDebug, "SetFrameSizeIABSquareButton");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 125 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 125 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABSquarePopUp()
	//  sets the Flash movie frame size to IAB Square
	//  Pop-up and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABSquarePopUp()
	{
		array_push($this->FMDebug, "SetFrameSizeIABSquarePopUp");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 250 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 250 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABVerticalBanner()
	//  sets the Flash movie frame size to IAB Vertical
	//  Banner and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABVerticalBanner()
	{
		array_push($this->FMDebug, "SetFrameSizeIABVerticalBanner");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 120 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 240 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABVerticalRectangle()
	//  sets the Flash movie frame size to IAB Vertical
	//  Rectangle and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABVerticalRectangle()
	{
		array_push($this->FMDebug, "SetFrameSizeIABVerticalRectangle");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 240 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 400 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array SetFrameSizeIABWideSkyscraper()
	//  sets the Flash movie frame size to IAB Wide
	//  Skyscraper and returns the array holding the new
	//  frame size. 
	//
	//  NOTE: must be called before the call to
	//        EndMovie().

	function SetFrameSizeIABWideSkyscraper()
	{
		array_push($this->FMDebug, "SetFrameSizeIABWideSkyscraper");

		$this->FrameSize["Xmin"] = 0;
		$this->FrameSize["Xmax"] = 160 * 20;
		$this->FrameSize["Ymin"] = 0;
		$this->FrameSize["Ymax"] = 600 * 20;

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 

	//--------------------------------------------------
	//  array GetFrameSize()
	//  returns the array that stores the Flash movie
	//  frame size, without changing it.

	function GetFrameSize()
	{
		array_push($this->FMDebug, "GetFrameSize");

		array_pop($this->FMDebug);

		return $this->FrameSize;
	} 
	
	//--------------------------------------------------
	//  float SetFrameRate(float framerate) 
	//  sets the Flash movie frame rate and returns it.
	//
	//  NOTE: must be called before the call to  
	//        EndMovie(), even better before 
	//        BeginMovie().

	function SetFrameRate($framerate)
	{
		array_push($this->FMDebug, "SetFrameRate");

		$lower_limit = 0.01;
		$upper_limit = 120;

		if (($framerate < $lower_limit) or ($framerate > $upper_limit)) {

			$this->FMError("SetFrameRate argument (framerate) out of range");
		} else {

			$this->FrameRate = $framerate;
		}

		array_pop($this->FMDebug);

		return $this->FrameRate;
	} 

	//--------------------------------------------------
	//  float GetFrameRate()
	//  returns the Flash movie frame rate without 
	//  changing it.

	function GetFrameRate()
	{
		array_push($this->FMDebug, "GetFrameRate");

		array_pop($this->FMDebug);

		return $this->FrameRate;
	} 
	
	//--------------------------------------------------
	//  array SetBackgroundColor(integer R, integer G,
	//                                        integer B) 
	//  sets the background color of the movie and 
	//  returns the array which stores it.
	//
	//  NOTE: must be called before the call to  
	//        EndMovie().

	function SetBackgroundColor($R, $G, $B)
	{
		array_push($this->FMDebug, "SetBackgroundColor");

		$lower_limit = 0;
		$upper_limit = 255;

		if (($R < $lower_limit) or ($R > $upper_limit) or ($G < $lower_limit) or ($G > $upper_limit) or ($B < $lower_limit) or ($B > $upper_limit)) {

			$this->FMError("SetBackgroundColor arguments out of range");
		} else {

			$this->BackgroundColor["R"] = $R;
			$this->BackgroundColor["G"] = $G;
			$this->BackgroundColor["B"] = $B;
		}

		array_pop($this->FMDebug);

		return $this->BackgroundColor;
	} 

	//--------------------------------------------------
	//  array GetBackgroundColor()
	//  returns the Flash movie background color without
	//  changing it.

	function GetBackgroundColor()
	{
		array_push($this->FMDebug, "GetBackgroundColor");

		array_pop($this->FMDebug);

		return $this->BackgroundColor;
	} 

	//--------------------------------------------------
	//  integer NextLayer()
	//  returns the number of the next available layer.

	function NextLayer()
	{
		array_push($this->FMDebug, "NextLayer");

		$this->CharacterDepth++;

		if ($this->CharacterDepth > $this->LayerLimit) {

			$this->FMError("NextLayer: layer limit exceeded");
		}

		array_pop($this->FMDebug);

		return $this->CharacterDepth;

	}

	//--------------------------------------------------
	//  integer PlaceObject(integer CharacterID,
	//           integer CharacterDepth, string MATRIX,
	//                                    string CXFORM) 
	//  adds the given character on the specified layer
	//  and returns the index number of that layer.

	function PlaceObject($CharacterID, $CharacterDepth, $MATRIX, $CXFORM)
	{
		array_push($this->FMDebug, "PlaceObject");

		//--------------------------------------------------
		//  check layer depth.

		if ($CharacterDepth > $this->LayerLimit) {

			$this->FMError("PlaceObject: layer limit exceeded");
		}

		$this->packPlaceObjectTag($CharacterID, $CharacterDepth, $MATRIX, $CXFORM);

		array_pop($this->FMDebug);

		return $CharacterDepth;
	}

	//--------------------------------------------------
	//  integer EasyPlaceObject(integer CharacterID)
	//  automatically adds the given character on the
	//  specified layer and returns the index number of
	//  that layer.

	function EasyPlaceObject($CharacterID)
	{
		array_push($this->FMDebug, "EasyPlaceObject");

		$CharacterDepth = $this->NextLayer();

		//--------------------------------------------------
		//  check layer depth.

		if ($CharacterDepth > $this->LayerLimit) {

			$this->FMError("EasyPlaceObject: layer limit exceeded");
		}

		$this->packPlaceObjectTag($CharacterID, $CharacterDepth, $this->DefineMATRIX(false, null, null, false, null, null, 0, 0), "");

		array_pop($this->FMDebug);

		return $CharacterDepth;
	}

	//--------------------------------------------------
	//  integer AdvancedPlaceObject(integer CharacterID,
	//          integer CharacterDepth, string MATRIX,
	//      string CXFORM, integer Ratio, string Name,
	//                              string ClipActions)
	//  adds the given object to the Display List or
	//  modifies an object on the given layer.

	function AdvancedPlaceObject($CharacterID, $CharacterDepth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions)
	{
		array_push($this->FMDebug, "AdvancedPlaceObject");

		//--------------------------------------------------
		//  check layer depth.

		if ($CharacterDepth > $this->LayerLimit) {

			$this->FMError("AdvancedPlaceObject: layer limit exceeded");
		}

		$this->packPlaceObject2Tag(false, true, $CharacterID, $CharacterDepth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions);

		array_pop($this->FMDebug);

		return $CharacterDepth;
	}

	//--------------------------------------------------
	//  integer AdvancedModifyObject(integer CharacterID,
	//          integer CharacterDepth, string MATRIX,
	//      string CXFORM, integer Ratio, string Name,
	//                              string ClipActions)
	//  adds the given object to the Display List or
	//  modifies an object on the given layer.

	function AdvancedModifyObject($CharacterDepth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions)
	{
		array_push($this->FMDebug, "AdvancedModifyObject");

		//--------------------------------------------------
		//  check layer depth.

		if ($CharacterDepth > $this->LayerLimit) {

			$this->FMError("AdvancedModifyObject: layer limit exceeded");
		}

		$this->packPlaceObject2Tag(true, false, null, $CharacterDepth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions);

		array_pop($this->FMDebug);

		return $CharacterDepth;
	}

	//--------------------------------------------------
	//  integer AdvancedReplaceObject(integer CharacterID,
	//          integer CharacterDepth, string MATRIX,
	//      string CXFORM, integer Ratio, string Name,
	//                              string ClipActions)
	//  adds the given object to the Display List or
	//  modifies an object on the given layer.

	function AdvancedReplaceObject($CharacterID, $CharacterDepth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions)
	{
		array_push($this->FMDebug, "AdvancedReplaceObject");

		//--------------------------------------------------
		//  check layer depth.

		if ($CharacterDepth > $this->LayerLimit) {

			$this->FMError("AdvancedReplaceObject: layer limit exceeded");
		}

		$this->packPlaceObject2Tag(true, true, $CharacterID, $CharacterDepth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions);

		array_pop($this->FMDebug);

		return $CharacterDepth;
	}

	//--------------------------------------------------
	//  integer RemoveObjectFromLayer(integer CharacterID,
	//                           integer CharacterDepth)
	//  removes the given character from the specified
	//  layer.

	function RemoveObjectFromLayer($CharacterID, $CharacterDepth)
	{
		array_push($this->FMDebug, "RemoveObjectFromLayer");

		$this->packRemoveObjectTag($CharacterID, $CharacterDepth);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  integer RemoveFromLayer(integer CharacterDepth)
	//  removes a character from the specified
	//  layer.

	function RemoveFromLayer($CharacterDepth)
	{
		array_push($this->FMDebug, "RemoveFromLayer");

		$this->packRemoveObject2Tag($CharacterDepth);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  integer EndFrame()
	//  marks the end of a frame in a Flash movie and 
	//  returns that frame's number.

	function EndFrame()
	{
		array_push($this->FMDebug, "EndFrame");

		$this->packShowFrameTag();

		$this->FrameCounter += 1;

		//--------------------------------------------------
		//  The real limit is 65535 frames, but older 
		//  versions of Flash Player only display the first
		//  16000 frames.

		if ($this->FrameCounter > $this->FrameNumberLimit) {

			$this->FMError("EndFrame: Too many frames!");
		}

		array_pop($this->FMDebug);

		return $this->FrameCounter;
	} 

	//--------------------------------------------------
	//  null BeginMovie()
	//  begins a Flash movie with the 
	//  SetBackgroundColor tag.
	//
	//  NOTE: This must be done at the very beginning
	//        of a movie. 

	function BeginMovie()
	{
		array_push($this->FMDebug, "BeginMovie");

		$this->packSetBackgroundColorTag((int)$this->BackgroundColor["R"], (int)$this->BackgroundColor["G"], (int)$this->BackgroundColor["B"]);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  null EndMovie()
	//  marks the end of a Flash movie.
	//
	//  NOTE: No other calls should be made after this
	//        point, except for GetMovie().

	function EndMovie()
	{
		array_push($this->FMDebug, "EndMovie");

		$this->packEndTag();
		$this->packMacromediaFlashSWFHeader();

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string GetMovie()
	//  returns a complete Flash movie bytestream, ready
	//  to be sent to the requesting client.
	//
	//  NOTE: Must be called after EndMovie().

	function GetMovie()
	{
		array_push($this->FMDebug, "GetMovie");

		array_pop($this->FMDebug);

		return $this->MovieData;
	} 

	//--------------------------------------------------
	//  string DefineMATRIX(boolean HasScale,
	//   float ScaleX, float ScaleY, boolean HasRotate,
	//            float RotateSkew0, float RotateSkew1,
	//           integer TranslateX, integer TranslateY)
	//  wrapper for packMATRIX() defined in 
	//  FreeMovieCompiler.

	function DefineMATRIX($HasScale, $ScaleX, $ScaleY, $HasRotate, $RotateSkew0, $RotateSkew1, $TranslateX, $TranslateY)  
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineMATRIX");

		$matrix = $this->packMATRIX($HasScale, $ScaleX, $ScaleY, $HasRotate, $RotateSkew0, $RotateSkew1, $TranslateX, -$TranslateY); 

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the SWF matrix atom string.

		return $matrix;
	}

	//--------------------------------------------------
	//  array DefineGradient(integer Ratio, 
	//         boolean AlphaFlag, integer R, integer G,
	//                             integer B, integer A)
	//  defines a gradient entry used to build a 
	//  gradient definition.

	function DefineGradient($Ratio, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineGradient");

		if ($AlphaFlag) {

			$gradient = array("Ratio" => $Ratio, "R" => $R, "G" => $G, "B" => $B, "A" => $A);

		} else {

			$gradient = array("Ratio" => $Ratio, "R" => $R, "G" => $G, "B" => $B);

		}

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the SWF gradient point atom string.

		return $gradient;
	}
		
	//--------------------------------------------------
	//
	//  Basic shapes without fills
	//  
	//--------------------------------------------------

	//--------------------------------------------------
	//  integer DefineStraightLine(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//     integer Width, boolean AlphaFlag, integer R,
	//                  integer G, integer B, integer A)
	//  defines a straight line.

	function DefineStraightLine($X1, $Y1, $X2, $Y2, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineStraightLine");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check for Character ID limit overflow.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineStraightLine: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used in this case).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one, in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line style and move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute displacements along the x and y axes.

		$DeltaX = $X2 - $X1;
		$DeltaY = $Y2 - $Y1;

		//--------------------------------------------------
		//  test if the line is general, horizontal or 
		//  vertical and use the appropriate straight edge 
		//  record.

		if (($DeltaX == 0) and ($DeltaY != 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX, $DeltaY);
		} elseif (($DeltaX != 0) and ($DeltaY == 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX, $DeltaY);

		} else {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2) - $margin;
		$X_max = max($X1, $X2) + $margin;
		$Y_min = min($Y1, $Y2) - $margin;
		$Y_max = max($Y1, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineTriangle(integer X1, integer Y1, 
	//              integer X2, integer Y2, integer X3, 
	//    integer Y3, integer Width, boolean AlphaFlag, 
	//       integer R, integer G, integer B, integer A)
	//  defines a triangle without fill.

	function DefineTriangle($X1, $Y1, $X2, $Y2, $X3, $Y3, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineTriangle");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineTriangle: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;
		$Y3 = $this->FrameSize["Ymax"] - $Y3;

		//--------------------------------------------------
		//  select line style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas for triangle edges.

		$DeltaX1 = $X2 - $X1;
		$DeltaY1 = $Y2 - $Y1;
		$DeltaX2 = $X3 - $X2;
		$DeltaY2 = $Y3 - $Y2;
		$DeltaX3 = $X1 - $X3;
		$DeltaY3 = $Y1 - $Y3;

		//--------------------------------------------------
		//  test if one or two of the triangle's edges are 
		//  general, horizontal or vertical and use the 
		//  appropriate straight edge record.

		if (($DeltaX1 == 0) and ($DeltaY1 != 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX1, $DeltaY1);
		} elseif (($DeltaX1 != 0) and ($DeltaY1 == 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX1, $DeltaY1);
		} else {
			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX1, $DeltaY1);
		}

		if (($DeltaX2 == 0) and ($DeltaY2 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX2, $DeltaY2);
		} elseif (($DeltaX2 != 0) and ($DeltaY2 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX2, $DeltaY2);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX2, $DeltaY2);
		}

		if (($DeltaX3 == 0) and ($DeltaY3 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX3, $DeltaY3);
		} elseif (($DeltaX3 != 0) and ($DeltaY3 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX3, $DeltaY3);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX3, $DeltaY3);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2, $X3) - $margin;
		$X_max = max($X1, $X2, $X3) + $margin;
		$Y_min = min($Y1, $Y2, $Y3) - $margin;
		$Y_max = max($Y1, $Y2, $Y3) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineRectangle(integer X1, integer Y1, 
	//           integer X2, integer Y2, integer Width,
	//         boolean AlphaFlag, integer R, integer G,
	//                             integer B, integer A)
	//  defines a rectangle without fill.

	function DefineRectangle($X1, $Y1, $X2, $Y2, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineRectangle");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineRectangle: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas.

		$DeltaX = $X2 - $X1;
		$DeltaY = $Y2 - $Y1;

		//--------------------------------------------------
		//  add vertical and horizontal straight edges.

		$EdgeRecords  = $this->packSTRAIGHTEDGERECORD(0, 1, 0, $DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX, 0);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, 0, -$DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, -$DeltaX, 0);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2) - $margin;
		$X_max = max($X1, $X2) + $margin;
		$Y_min = min($Y1, $Y2) - $margin;
		$Y_max = max($Y1, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefinePolygon(integer Segments,
	//          integer X1, integer Y1, integer Radius,
	//     integer Width, boolean AlphaFlag, integer R,
	//                  integer G, integer B, integer A)
	//  defines a regular polygon without fill.

	function DefinePolygon($Segments, $X1, $Y1, $Radius, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefinePolygon");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefinePolygon: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1;
		$Y2 = $Y1 - $Radius;

		//--------------------------------------------------
		//  select line style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X2, $Y2, 0, 1, 0, 0, 1, "", "", 0, 0);		
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		//--------------------------------------------------
		//  compute step angle.

		$step = 2 * pi() / $Segments;

		for ($n = 0; $n < $Segments; $n++) {

			//--------------------------------------------------
			//  compute x and y deltas.

			$angle = -(pi() / 2) + $step * $n;

			$X3 = $X1 + $Radius * cos($angle);
			$Y3 = $Y1 + $Radius * sin($angle);
			$X4 = $X1 + $Radius * cos($angle + $step);
			$Y4 = $Y1 + $Radius * sin($angle + $step);

			$DeltaX = round($X4 - $X3);
			$DeltaY = round($Y4 - $Y3);

			//--------------------------------------------------
			//  add a straight edge.

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineBezierQuad(integer Accuracy,
	//        integer X1, integer Y1, integer ControlX,
	//        integer ControlY, integer X2, integer Y2,
	//     integer Width, boolean AlphaFlag, integer R,
	//                  integer G, integer B, integer A)
	//  defines a 2nd degree Bezier curve using straight
	//  line segments.

	function DefineBezierQuad($Accuracy, $X1, $Y1, $ControlX, $ControlY, $X2, $Y2, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBezierQuad");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBezierQuad: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$ControlY = $this->FrameSize["Ymax"] - $ControlY;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line style.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		for($n = 0; $n < $Accuracy; $n++) { 

			//--------------------------------------------------
			//  compute values of u.

			$us = $n / $Accuracy;
			$uf = ($n + 1) / $Accuracy;

			//--------------------------------------------------
			//  compute control and anchor deltas.

			$QX1s = $X1 * pow((1 - $us), 2);
			$QY1s = $Y1 * pow((1 - $us), 2);
			$QXCs = $ControlX * 2 * $us * (1 - $us);
			$QYCs = $ControlY * 2 * $us * (1 - $us);
			$QX2s = $X2 * pow($us, 2);
			$QY2s = $Y2 * pow($us, 2);

			$QXs = $QX1s + $QXCs + $QX2s;
			$QYs = $QY1s + $QYCs + $QY2s;

			$QX1f = $X1 * pow((1 - $uf), 2);
			$QY1f = $Y1 * pow((1 - $uf), 2);
			$QXCf = $ControlX * 2 * $uf * (1 - $uf);
			$QYCf = $ControlY * 2 * $uf * (1 - $uf);
			$QX2f = $X2 * pow($uf, 2);
			$QY2f = $Y2 * pow($uf, 2);

			$QXf = $QX1f + $QXCf + $QX2f;
			$QYf = $QY1f + $QYCf + $QY2f;

			$AnchorDeltaX = round($QXf - $QXs);
			$AnchorDeltaY = round($QYf - $QYs);

			//--------------------------------------------------
			//  add a straight edge.

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		//.[cal]
		if(!isset($EndShape) & $this->Cal_mode){
		  $EndShape = "";
		}
		//[cal].
		$EndShape .= $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $ControlX, $X2) - $margin;
		$X_max = max($X1, $ControlX, $X2) + $margin;
		$Y_min = min($Y1, $ControlY, $Y2) - $margin;
		$Y_max = max($Y1, $ControlY, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineBezierCubic(integer Accuracy, 
	//       integer X1, integer Y1, integer ControlX1,
	//            integer ControlY1, integer ControlX2,
	//       integer ControlY2, integer X2, integer Y2,
	//     integer Width, boolean AlphaFlag, integer R,
	//                  integer G, integer B, integer A)
	//  defines a 3rd degree Bezier curve using 
	//  straight line segments.

	function DefineBezierCubic($Accuracy, $X1, $Y1, $ControlX1, $ControlY1, $ControlX2, $ControlY2, $X2, $Y2, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBezierCubic");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBezierCubic: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$ControlY1 = $this->FrameSize["Ymax"] - $ControlY1;
		$ControlY2 = $this->FrameSize["Ymax"] - $ControlY2;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		for($n = 0; $n < $Accuracy; $n++) { 

			//--------------------------------------------------
			//  compute values of u.

			$us = $n / $Accuracy;
			$uf = ($n + 1) / $Accuracy;

			//--------------------------------------------------
			//  compute control and anchor deltas.

			$QX1s = $X1 * pow((1 - $us), 3);
			$QY1s = $Y1 * pow((1 - $us), 3);
			$QXC1s = $ControlX1 * 3 * $us * pow((1 - $us), 2);
			$QYC1s = $ControlY1 * 3 * $us * pow((1 - $us), 2);
			$QXC2s = $ControlX2 * 3 * pow($us, 2) * (1 - $us);
			$QYC2s = $ControlY2 * 3 * pow($us, 2) * (1 - $us);
			$QX2s = $X2 * pow($us, 3);
			$QY2s = $Y2 * pow($us, 3);

			$QXs = $QX1s + $QXC1s + $QXC2s + $QX2s;
			$QYs = $QY1s + $QYC1s + $QYC2s + $QY2s;

			$QX1f = $X1 * pow((1 - $uf), 3);
			$QY1f = $Y1 * pow((1 - $uf), 3);
			$QXC1f = $ControlX1 * 3 * $uf * pow((1 - $uf), 2);
			$QYC1f = $ControlY1 * 3 * $uf * pow((1 - $uf), 2);
			$QXC2f = $ControlX2 * 3 * pow($uf, 2) * (1 - $uf);
			$QYC2f = $ControlY2 * 3 * pow($uf, 2) * (1 - $uf);
			$QX2f = $X2 * pow($uf, 3);
			$QY2f = $Y2 * pow($uf, 3);

			$QXf = $QX1f + $QXC1f + $QXC2f + $QX2f;
			$QYf = $QY1f + $QYC1f + $QYC2f + $QY2f;

			$DeltaX = round($QXf - $QXs);
			$DeltaY = round($QYf - $QYs);

			//--------------------------------------------------
			//  add a straight edge.

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		//.[cal]
		if(!isset($EndShape) & $this->Cal_mode){
		  $EndShape = "";
		}
		//[cal].

		$EndShape .= $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $ControlX1, $ControlX2, $X2) - $margin;
		$X_max = max($X1, $ControlX1, $ControlX2, $X2) + $margin;
		$Y_min = min($Y1, $ControlY1, $ControlY2, $Y2) - $margin;
		$Y_max = max($Y1, $ControlY1, $ControlY2, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineCurvedLine(integer X1, 
	//                    integer Y1, integer ControlX,
	//        integer ControlY, integer X2, integer Y2,
	//     integer Width, boolean AlphaFlag, integer R,
	//                  integer G, integer B, integer A)
	//  defines a 2nd degree Bezier curve using 
	//  the CURVEDEDGERECORD structure.

	function DefineCurvedLine($X1, $Y1, $ControlX, $ControlY, $X2, $Y2, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineCurvedLine");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineCurvedLine: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$ControlY = $this->FrameSize["Ymax"] - $ControlY;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute control and anchor deltas.

		$ControlDeltaX = $ControlX - $X1;
		$ControlDeltaY = $ControlY - $Y1;
		$AnchorDeltaX = $X2 - $ControlX;
		$AnchorDeltaY = $Y2 - $ControlY;

		//--------------------------------------------------
		//  define a curved edge.

		$EdgeRecords = $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		//--------------------------------------------------
		//  mark the end of the shape.

		//.[cal]
		if(!isset($EndShape) & $this->Cal_mode){
		  $EndShape = "";
		}
		//[cal].
		$EndShape .= $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $ControlX, $X2) - $margin;
		$X_max = max($X1, $ControlX, $X2) + $margin;
		$Y_min = min($Y1, $ControlY, $Y2) - $margin;
		$Y_max = max($Y1, $ControlY, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineCircle(integer Accuracy, 
	//          integer X1, integer Y1, integer Radius,
	//                 integer Accuracy, integer Width,
	//         boolean AlphaFlag, integer R, integer G,
	//                             integer B, integer A)
	//  defines a circle without fill.

	function DefineCircle($Accuracy, $X1, $Y1, $Radius, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineCircle");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineCircle: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1 + $Radius;
		$Y2 = $Y1;

		//--------------------------------------------------
		//  select line style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X2, $Y2, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = 2 * pi() / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 
		
		//.[cal]
		$Angle1 = 0;
		//[cal].

	
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineArc(integer Accuracy,
	//            integer X1, integer Y1, float Angle1,
	//     float Angle2, integer Radius, integer Width,
	//         boolean AlphaFlag, integer R, integer G,
	//                             integer B, integer A)
	//  defines an arc.

	function DefineArc($Accuracy, $X1, $Y1, $Angle1, $Angle2, $Radius, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineArc");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineArc: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X1 = $X1 + round($Radius * cos($Angle1));
		$Y1 = $Y1 + round($Radius * sin($Angle1));

		//--------------------------------------------------
		//  select line style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = ($Angle2 - $Angle1) / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

	
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineArcClosed(integer Accuracy,
	//            integer X1, integer Y1, float Angle1,
	//     float Angle2, integer Radius, integer Width,
	//         boolean AlphaFlag, integer R, integer G,
	//                             integer B, integer A)
	//  defines a closed arc.

	function DefineArcClosed($Accuracy, $X1, $Y1, $Angle1, $Angle2, $Radius, $Width, $AlphaFlag, $R, $G, $B, $A)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineArcClosed");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineArcClosed: character limit exceeded");
		}

		//--------------------------------------------------
		//  define fill styles (none are used here).

		$FillStyle = "";
		$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

		//--------------------------------------------------
		//  define line styles (just one in this case).

		$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
		$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		//--------------------------------------------------
		//  select line style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, 1, 0, 0, 1, $X1, $Y1, 0, 1, 0, 0, 1, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute fist straight line deltas.

		$DeltaX = round($Radius * cos($Angle1));
		$DeltaY = round($Radius * sin($Angle1));

		//--------------------------------------------------
		//  add fist straight line.

	
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = ($Angle2 - $Angle1) / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  compute second line deltas. 

		$DeltaX = -round($Radius * cos($Angle2));
		$DeltaY = -round($Radius * sin($Angle2));

		//--------------------------------------------------
		//  add second line. 

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 0, 1, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//
	//  Basic shapes with solid fills 
	//  
	//--------------------------------------------------

	//--------------------------------------------------
	//  integer DefineTriangleSolid(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//           integer X3, integer Y3, integer Width,
	//             boolean AlphaFlag, boolean EdgeFlag,
	//      integer R, integer G, integer B, integer A,
	//                 boolean FillFlag, integer FillR,
	//      integer FillG, integer FillB, integer FillA)
	//  defines a triangle with the solid fill.

	function DefineTriangleSolid($X1, $Y1, $X2, $Y2, $X3, $Y3, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $FillFlag, $FillR, $FillG, $FillB, $FillA)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineTriangleSolid");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineTriangleSolid: character limit exceeded");
		}

		if ($FillFlag) {

			//--------------------------------------------------
			//  define fill styles (just one in this case).

			$FillStyle = $this->packFILLSTYLE(0x00, $FillR, $FillG, $FillB, $AlphaFlag, $FillA, "", "", "", "");
			$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

			$nFillBits = 1;
			$FillStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define fill styles (none are used here).

			$FillStyle = "";
			$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

			$nFillBits = 0;
			$FillStyleIndex = 0;
		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;
		$Y3 = $this->FrameSize["Ymax"] - $Y3;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, $FillFlag, 0, 1, $X1, $Y1, $nFillBits, $nLineBits, 0, $FillStyleIndex, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas for triangle edges

		$DeltaX1 = $X2 - $X1;
		$DeltaY1 = $Y2 - $Y1;
		$DeltaX2 = $X3 - $X2;
		$DeltaY2 = $Y3 - $Y2;
		$DeltaX3 = $X1 - $X3;
		$DeltaY3 = $Y1 - $Y3;

		//--------------------------------------------------
		//  test if one or two of the triangle's edges are 
		//  general, horizontal or vertical and use the 
		//  appropriate straight edge record.

		if (($DeltaX1 == 0) and ($DeltaY1 != 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX1, $DeltaY1);
		} elseif (($DeltaX1 != 0) and ($DeltaY1 == 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX1, $DeltaY1);
		} else {
			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX1, $DeltaY1);
		}

		if (($DeltaX2 == 0) and ($DeltaY2 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX2, $DeltaY2);
		} elseif (($DeltaX2 != 0) and ($DeltaY2 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX2, $DeltaY2);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX2, $DeltaY2);
		}

		if (($DeltaX3 == 0) and ($DeltaY3 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX3, $DeltaY3);
		} elseif (($DeltaX3 != 0) and ($DeltaY3 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX3, $DeltaY3);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX3, $DeltaY3);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2, $X3) - $margin;
		$X_max = max($X1, $X2, $X3) + $margin;
		$Y_min = min($Y1, $Y2, $Y3) - $margin;
		$Y_max = max($Y1, $Y2, $Y3) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, $nFillBits, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineRectangleSolid(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//          integer B, integer A, boolean FillFlag, 
	//     integer FillR, integer FillG, integer FillB,
	//                                    integer FillA)
	//  defines a rectangle with the solid fill.

	function DefineRectangleSolid($X1, $Y1, $X2, $Y2, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $FillFlag, $FillR, $FillG, $FillB, $FillA)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineRectangleSolid");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineRectangleSolid: character limit exceeded");
		}

		if ($FillFlag) {

			//--------------------------------------------------
			//  define fill styles (just one in this case).

			$FillStyle = $this->packFILLSTYLE(0x00, $FillR, $FillG, $FillB, $AlphaFlag, $FillA, "", "", "", "");
			$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

			$nFillBits = 1;
			$FillStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define fill styles (none are used here).

			$FillStyle = "";
			$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

			$nFillBits = 0;
			$FillStyleIndex = 0;
		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, $FillFlag, 0, 1, $X1, $Y1, $nFillBits, $nLineBits, 0, $FillStyleIndex, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas.

		$DeltaX = $X2 - $X1;
		$DeltaY = $Y2 - $Y1;

		//--------------------------------------------------
		//  add vertical and horizontal straight edges.

		$EdgeRecords  = $this->packSTRAIGHTEDGERECORD(0, 1, 0, $DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX, 0);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, 0, -$DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, -$DeltaX, 0);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2) - $margin;
		$X_max = max($X1, $X2) + $margin;
		$Y_min = min($Y1, $Y2) - $margin;
		$Y_max = max($Y1, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, $nFillBits, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefinePolygonSolid(integer Segments,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//          integer B, integer A, boolean FillFlag,
	//     integer FillR, integer FillG, integer FillB,
	//                                    integer FillA)
	//  draws a polygon with the solid fill.

	function DefinePolygonSolid($Segments, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $FillFlag, $FillR, $FillG, $FillB, $FillA)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefinePolygonSolid");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefinePolygonSolid: character limit exceeded");
		}

		if ($FillFlag) {

			//--------------------------------------------------
			//  define fill styles (just one in this case).

			$FillStyle = $this->packFILLSTYLE(0x00, $FillR, $FillG, $FillB, $AlphaFlag, $FillA, "", "", "", "");
			$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

			$nFillBits = 1;
			$FillStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define fill styles (none are used here).

			$FillStyle = "";
			$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

			$nFillBits = 0;
			$FillStyleIndex = 0;
		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1;
		$Y2 = $Y1 - $Radius;

		//--------------------------------------------------
		//  select line and fill style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, $FillFlag, 0, 1, $X2, $Y2, $nFillBits, $nLineBits, 0, $FillStyleIndex, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute step angle.

		$step = 2 * pi() / $Segments;

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		for ($n = 0; $n < $Segments; $n++) {

			//--------------------------------------------------
			//  compute x and y deltas.

			$angle = -(pi() / 2) + $step * $n;

			$X3 = $X1 + $Radius * cos($angle);
			$Y3 = $Y1 + $Radius * sin($angle);
			$X4 = $X1 + $Radius * cos($angle + $step);
			$Y4 = $Y1 + $Radius * sin($angle + $step);

			$DeltaX = round($X4 - $X3);
			$DeltaY = round($Y4 - $Y3);

			//--------------------------------------------------
			//  add a straight edge.

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, $nFillBits, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineCircleSolid(integer Accuracy,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//          integer B, integer A, boolean FillFlag,
	//     integer FillR, integer FillG, integer FillB,
	//                                    integer FillA)
	//  defines a circle with the solid fill.

	function DefineCircleSolid($Accuracy, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $FillFlag, $FillR, $FillG, $FillB, $FillA)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineCircleSolid");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineCircleSolid: character limit exceeded");
		}

		if ($FillFlag) {

			//--------------------------------------------------
			//  define fill styles (just one in this case).

			$FillStyle = $this->packFILLSTYLE(0x00, $FillR, $FillG, $FillB, $AlphaFlag, $FillA, "", "", "", "");
			$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

			$nFillBits = 1;
			$FillStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define fill styles (none are used here).

			$FillStyle = "";
			$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

			$nFillBits = 0;
			$FillStyleIndex = 0;
		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1 + $Radius;
		$Y2 = $Y1;

		//--------------------------------------------------
		//  select line and fill style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, $FillFlag, 0, 1, $X2, $Y2, $nFillBits, $nLineBits, 0, $FillStyleIndex, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = 2 * pi() / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Angle1) & $this->Cal_mode){
		  $Angle1 = 0;
		}
		// [cal].

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, $nFillBits, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineArcClosedSolid(integer Accuracy,
	//          float Angle1, float Angle2, integer X1,
	//       integer Y1, integer Radius, integer Width,
	//             boolean AlphaFlag, boolean EdgeFlag,
	//      integer R, integer G, integer B, integer A,
	//                 boolean FillFlag, integer FillR,
	//      integer FillG, integer FillB, integer FillA)
	//  draws a closed arc with the solid fill.

	function DefineArcClosedSolid($Accuracy, $Angle1, $Angle2, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $FillFlag, $FillR, $FillG, $FillB, $FillA)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineArcClosedSolid");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineArcClosedSolid: character limit exceeded");
		}

		if ($FillFlag) {

			//--------------------------------------------------
			//  define fill styles (just one in this case).

			$FillStyle = $this->packFILLSTYLE(0x00, $FillR, $FillG, $FillB, $AlphaFlag, $FillA, "", "", "", "");
			$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

			$nFillBits = 1;
			$FillStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define fill styles (none are used here).

			$FillStyle = "";
			$FillStyleArray = $this->packFILLSTYLEARRAY(0, $FillStyle); 

			$nFillBits = 0;
			$FillStyleIndex = 0;
		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, $FillFlag, 0, 1, $X1, $Y1, $nFillBits, $nLineBits, 0, $FillStyleIndex, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute fist straight line deltas.

		$DeltaX = round($Radius * cos($Angle1));
		$DeltaY = round($Radius * sin($Angle1));

		//--------------------------------------------------
		//  add fist straight line.

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = ($Angle2 - $Angle1) / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  compute second line deltas. 

		$DeltaX = -round($Radius * cos($Angle2));
		$DeltaY = -round($Radius * sin($Angle2));

		//--------------------------------------------------
		//  add second line. 

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape and add it to the main movie 
		//  bytestream. 

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, $nFillBits, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//
	//  Basic shapes with gradient fills 
	//  
	//--------------------------------------------------

	//--------------------------------------------------
	//  integer DefineTriangleGradient(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//           integer X3, integer Y3, integer Width,
	//             boolean AlphaFlag, boolean EdgeFlag,
	//      integer R, integer G, integer B, integer A,
	//                             string GradientType,
	//       array GradientDefinition, boolean AutoFit,
	//                            string GradientMatrix)
	//  defines a triangle with the gradient fill.

	function DefineTriangleGradient($X1, $Y1, $X2, $Y2, $X3, $Y3, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $GradientType, $GradientDefinition, $AutoFitFlag, $GradientMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineTriangleGradient");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineTriangleGradient: character limit exceeded");
		}

		//--------------------------------------------------
		//  check the number of gradient entries.

		$m = count($GradientDefinition);

		if ($m < 1) {

			$this->FMError("gradient too short");
		}

		if ($m > 8) {

			$this->FMError("gradient too long");
		}

		//--------------------------------------------------
		//  check for alpha in gradient definition.

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			if (array_key_exists("A", $GradientRecord)) {

				$A = $GradientRecord["A"];
				$AlphaFlag = True;

			}

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;
		$Y3 = $this->FrameSize["Ymax"] - $Y3;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X1, $Y1, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas for triangle edges

		$DeltaX1 = $X2 - $X1;
		$DeltaY1 = $Y2 - $Y1;
		$DeltaX2 = $X3 - $X2;
		$DeltaY2 = $Y3 - $Y2;
		$DeltaX3 = $X1 - $X3;
		$DeltaY3 = $Y1 - $Y3;

		//--------------------------------------------------
		//  test if one or two of the triangle's edges are 
		//  general, horizontal or vertical and use the 
		//  appropriate straight edge record.

		if (($DeltaX1 == 0) and ($DeltaY1 != 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX1, $DeltaY1);
		} elseif (($DeltaX1 != 0) and ($DeltaY1 == 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX1, $DeltaY1);
		} else {
			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX1, $DeltaY1);
		}

		if (($DeltaX2 == 0) and ($DeltaY2 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX2, $DeltaY2);
		} elseif (($DeltaX2 != 0) and ($DeltaY2 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX2, $DeltaY2);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX2, $DeltaY2);
		}

		if (($DeltaX3 == 0) and ($DeltaY3 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX3, $DeltaY3);
		} elseif (($DeltaX3 != 0) and ($DeltaY3 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX3, $DeltaY3);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX3, $DeltaY3);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2, $X3) - $margin;
		$X_max = max($X1, $X2, $X3) + $margin;
		$Y_min = min($Y1, $Y2, $Y3) - $margin;
		$Y_max = max($Y1, $Y2, $Y3) + $margin;

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Gradient) & $this->Cal_mode){
		  $Gradient = "";
		}
		// [cal].

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			$Ratio = $GradientRecord["Ratio"];
			$R = $GradientRecord["R"];
			$G = $GradientRecord["G"];
			$B = $GradientRecord["B"];

			if (array_key_exists("A", $GradientRecord)) {
				$A = $GradientRecord["A"];
			} else {
				$A = 255;
			}

			$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
		}

		$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

		//--------------------------------------------------
		//  check if the gradient is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$GradientMatrix = $this->packMATRIX(true, ($X_max - $X_min) / 32768, ($Y_max - $Y_min) / 32768, false, 0, 0, $X_min + ($X_max - $X_min) / 2, $Y_min + ($Y_max - $Y_min) / 2); 

		}

		if ($GradientType == "l") {

			$GradType = 0x10;

		} elseif ($GradientType == "r") {

			$GradType = 0x12;

		} else {

			$this->SWFError("wrong gradient type");

		}
			$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");


		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineRectangleGradient(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//       integer B, integer A, string GradientType,
	//   array GradientDefinition, boolean AutoFitFlag,
	//                            string GradientMatrix)
	//  defines a rectangle with the gradient fill.

	function DefineRectangleGradient($X1, $Y1, $X2, $Y2, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $GradientType, $GradientDefinition, $AutoFitFlag, $GradientMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineRectangleGradient");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineRectangleGradient: character limit exceeded");
		}

		//--------------------------------------------------
		//  check the number of gradient entries.

		$m = count($GradientDefinition);

		if ($m < 1) {

			$this->FMError("gradient too short");
		}

		if ($m > 8) {

			$this->FMError("gradient too long");
		}

		//--------------------------------------------------
		//  check for alpha in gradient definition.

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			if (array_key_exists("A", $GradientRecord)) {

				$A = $GradientRecord["A"];
				$AlphaFlag = True;

			}

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X1, $Y1, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas.

		$DeltaX = $X2 - $X1;
		$DeltaY = $Y2 - $Y1;

		//--------------------------------------------------
		//  add vertical and horizontal straight edges.

		$EdgeRecords  = $this->packSTRAIGHTEDGERECORD(0, 1, 0, $DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX, 0);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, 0, -$DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, -$DeltaX, 0);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2) - $margin;
		$X_max = max($X1, $X2) + $margin;
		$Y_min = min($Y1, $Y2) - $margin;
		$Y_max = max($Y1, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);


		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Gradient) & $this->Cal_mode){
		  $Gradient = "";
		}
		// [cal].
		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			$Ratio = $GradientRecord["Ratio"];
			$R = $GradientRecord["R"];
			$G = $GradientRecord["G"];
			$B = $GradientRecord["B"];

			if (array_key_exists("A", $GradientRecord)) {
				$A = $GradientRecord["A"];
			} else {
				$A = 255;
			}

			$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
		}

		$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

		//--------------------------------------------------
		//  check if the gradient is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$GradientMatrix = $this->packMATRIX(true, ($X_max - $X_min) / 32768, ($Y_max - $Y_min) / 32768, false, 0, 0, $X_min + ($X_max - $X_min) / 2, $Y_min + ($Y_max - $Y_min) / 2); 

		}

		if ($GradientType == "l") {

			$GradType = 0x10;

		} elseif ($GradientType == "r") {

			$GradType = 0x12;

		} else {

			$this->SWFError("wrong gradient type");

		}
			$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");


		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefinePolygonGradient(integer Segments,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//       integer B, integer A, string GradientType,
	//   array GradientDefinition, boolean AutoFitFlag,
	//                            string GradientMatrix)
	//  defines a regular polygon with the gradient fill.

	function DefinePolygonGradient($Segments, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $GradientType, $GradientDefinition, $AutoFitFlag, $GradientMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefinePolygonGradient");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefinePolygonGradient: character limit exceeded");
		}

		//--------------------------------------------------
		//  check the number of gradient entries.

		$m = count($GradientDefinition);

		if ($m < 1) {

			$this->FMError("gradient too short");
		}

		if ($m > 8) {

			$this->FMError("gradient too long");
		}

		//--------------------------------------------------
		//  check for alpha in gradient definition.

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			if (array_key_exists("A", $GradientRecord)) {

				$A = $GradientRecord["A"];
				$AlphaFlag = True;

			}

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1;
		$Y2 = $Y1 - $Radius;

		//--------------------------------------------------
		//  select line and fill style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X2, $Y2, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute step angle.

		$step = 2 * pi() / $Segments;

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].
		for ($n = 0; $n < $Segments; $n++) {

			//--------------------------------------------------
			//  compute x and y deltas.

			$angle = -(pi() / 2) + $step * $n;

			$X3 = $X1 + $Radius * cos($angle);
			$Y3 = $Y1 + $Radius * sin($angle);
			$X4 = $X1 + $Radius * cos($angle + $step);
			$Y4 = $Y1 + $Radius * sin($angle + $step);

			$DeltaX = round($X4 - $X3);
			$DeltaY = round($Y4 - $Y3);

			//--------------------------------------------------
			//  add a straight edge.

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Gradient) & $this->Cal_mode){
		  $Gradient = "";
		}
		// [cal].

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			$Ratio = $GradientRecord["Ratio"];
			$R = $GradientRecord["R"];
			$G = $GradientRecord["G"];
			$B = $GradientRecord["B"];

			if (array_key_exists("A", $GradientRecord)) {
				$A = $GradientRecord["A"];
			} else {
				$A = 255;
			}

			$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
		}

		$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

		//--------------------------------------------------
		//  check if the gradient is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$GradientMatrix = $this->packMATRIX(true, ($X_max - $X_min) / 32768, ($Y_max - $Y_min) / 32768, false, 0, 0, $X_min + ($X_max - $X_min) / 2, $Y_min + ($Y_max - $Y_min) / 2); 

		}

		if ($GradientType == "l") {

			$GradType = 0x10;

		} elseif ($GradientType == "r") {

			$GradType = 0x12;

		} else {

			$this->SWFError("wrong gradient type");

		}
			$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");


		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineCircleGradient(integer Accuracy,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//       integer B, integer A, string GradientType,
	//   array GradientDefinition, boolean AutoFitFlag,
	//                            string GradientMatrix)
	//  defines a circle with the gradient fill.

	function DefineCircleGradient($Accuracy, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $GradientType, $GradientDefinition, $AutoFitFlag, $GradientMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineCircleGradient");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineCircleGradient: character limit exceeded");
		}

		//--------------------------------------------------
		//  check the number of gradient entries.

		$m = count($GradientDefinition);

		if ($m < 1) {

			$this->FMError("gradient too short");
		}

		if ($m > 8) {

			$this->FMError("gradient too long");
		}

		//--------------------------------------------------
		//  check for alpha in gradient definition.

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			if (array_key_exists("A", $GradientRecord)) {

				$A = $GradientRecord["A"];
				$AlphaFlag = True;

			}

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1 + $Radius;
		$Y2 = $Y1;

		//--------------------------------------------------
		//  select line and fill style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X2, $Y2, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = 2 * pi() / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Angle1) & $this->Cal_mode){
		  $Angle1 = 0;
		}
		// [cal].
		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].


		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Gradient) & $this->Cal_mode){
		  $Gradient = "";
		}
		// [cal].

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			$Ratio = $GradientRecord["Ratio"];
			$R = $GradientRecord["R"];
			$G = $GradientRecord["G"];
			$B = $GradientRecord["B"];

			if (array_key_exists("A", $GradientRecord)) {
				$A = $GradientRecord["A"];
			} else {
				$A = 255;
			}

			$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
		}

		$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

		//--------------------------------------------------
		//  check if the gradient is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$GradientMatrix = $this->packMATRIX(true, ($X_max - $X_min) / 32768, ($Y_max - $Y_min) / 32768, false, 0, 0, $X_min + ($X_max - $X_min) / 2, $Y_min + ($Y_max - $Y_min) / 2); 

		}

		if ($GradientType == "l") {

			$GradType = 0x10;

		} elseif ($GradientType == "r") {

			$GradType = 0x12;

		} else {

			$this->FMError("wrong gradient type");

		}
			$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");


		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineArcCloseGradient(
	//    integer Accuracy, float Angle1, float Angle2,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//       integer B, integer A, string GradientType,
	//   array GradientDefinition, boolean AutoFitFlag,
	//                            string GradientMatrix)
	//  defines a closed arc with the gradient fill.

	function DefineArcClosedGradient($Accuracy, $Angle1, $Angle2, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $GradientType, $GradientDefinition, $AutoFitFlag, $GradientMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineArcClosedGradient");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineArcClosedGradient: character limit exceeded");
		}

		//--------------------------------------------------
		//  check the number of gradient entries.

		$m = count($GradientDefinition);

		if ($m < 1) {

			$this->FMError("gradient too short");
		}

		if ($m > 8) {

			$this->FMError("gradient too long");
		}

		//--------------------------------------------------
		//  check for alpha in gradient definition.

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			if (array_key_exists("A", $GradientRecord)) {

				$A = $GradientRecord["A"];
				$AlphaFlag = True;

			}

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X1, $Y1, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute fist straight line deltas.

		$DeltaX = round($Radius * cos($Angle1));
		$DeltaY = round($Radius * sin($Angle1));

		//--------------------------------------------------
		//  add fist straight line.

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($EdgeRecords) & $this->Cal_mode){
		  $EdgeRecords = "";
		}
		// [cal].
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = ($Angle2 - $Angle1) / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  compute second line deltas. 

		$DeltaX = -round($Radius * cos($Angle2));
		$DeltaY = -round($Radius * sin($Angle2));

		//--------------------------------------------------
		//  add second line. 

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($Gradient) & $this->Cal_mode){
		  $Gradient = "";
		}
		// [cal].

		for ($n = 1; $n <= $m; $n++) {

			$GradientRecord = $GradientDefinition[$n - 1];

			$Ratio = $GradientRecord["Ratio"];
			$R = $GradientRecord["R"];
			$G = $GradientRecord["G"];
			$B = $GradientRecord["B"];

			if (array_key_exists("A", $GradientRecord)) {
				$A = $GradientRecord["A"];
			} else {
				$A = 255;
			}

			$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
		}

		$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

		//--------------------------------------------------
		//  check if the gradient is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$GradientMatrix = $this->packMATRIX(true, ($X_max - $X_min) / 32768, ($Y_max - $Y_min) / 32768, false, 0, 0, $X_min + ($X_max - $X_min) / 2, $Y_min + ($Y_max - $Y_min) / 2); 

		}

		if ($GradientType == "l") {

			$GradType = 0x10;

		} elseif ($GradientType == "r") {

			$GradType = 0x12;

		} else {

			$this->SWFError("wrong gradient type");

		}
			$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");


		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($GradType, "", "", "", $AlphaFlag, "", $GradientMatrix, $Gradient, "", "");
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//
	//  Basic shapes with bitmap fills 
	//  
	//--------------------------------------------------

	//--------------------------------------------------
	//  null DefineBitmapJPEGTables(string file)
	//  defines the JPEGTables tag.

	function DefineBitmapJPEGTables($file)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBitmapJPEGTables");

		//--------------------------------------------------
		//  create the JPEG encoding tables. 

		$BitmapJPEG = $this->parseJPEGfile($file);

		$this->packJPEGTablesTag($BitmapJPEG["JPEGEncoding"]);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  null DefineBitmapJPEGImage(string file)
	//  defines the DefineBits tag.

	function DefineBitmapJPEGImage($file)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBitmapJPEGImage");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBitmapJPEGImage: character limit exceeded");
		}

		$BitmapJPEG = $this->parseJPEGfile($file);

		$this->packDefineBitsTag($this->CharacterID, $BitmapJPEG["JPEGImage"]);

		$this->Bitmaps[$this->CharacterID] = array("width" => $BitmapJPEG["width"], "height" => $BitmapJPEG["height"]);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterID of this bitmap.

		return $this->CharacterID;
	}

	//--------------------------------------------------
	//  null DefineBitmapJPEG(string file)
	//  defines the DefineBitsJPEG2 tag.

	function DefineBitmapJPEG($file)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBitmapJPEG");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBitmapJPEG: character limit exceeded");
		}

		$BitmapJPEG = $this->parseJPEGfile($file);

		$this->packDefineBitsJPEG2Tag($this->CharacterID, $BitmapJPEG["JPEGEncoding"], $BitmapJPEG["JPEGImage"]);

		$this->Bitmaps[$this->CharacterID] = array("width" => $BitmapJPEG["width"], "height" => $BitmapJPEG["height"]);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterID of this bitmap.

		return $this->CharacterID;
	}

	//--------------------------------------------------
	//  null DefineBitmapJPEGAlpha(string file, 
	//                                 string fileAlpha)
	//  defines the DefineBitsJPEG3 tag.

	function DefineBitmapJPEGAlpha($fileJPEG, $fileAlpha)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBitmapJPEGAlpha");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBitmapJPEGAlpha: character limit exceeded");
		}

		$BitmapJPEG = $this->parseJPEGfile($fileJPEG);
		$BitmapTIFF = $this->parseTIFFfile($fileAlpha, null);

		$this->packDefineBitsJPEG3Tag($this->CharacterID, $BitmapJPEG["JPEGEncoding"], $BitmapJPEG["JPEGImage"], $BitmapTIFF["alphadata"]);

		$this->Bitmaps[$this->CharacterID] = array("width" => $BitmapJPEG["width"], "height" => $BitmapJPEG["height"], "Alpha" => true);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterID of this bitmap.

		return $this->CharacterID;
	}

	//--------------------------------------------------
	//  null DefineBitmapTIFF(string file)
	//  defines the DefineBitsLossless tag and returns
	//  its ID.

	function DefineBitmapTIFF($file)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBitmapTIFF");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBitmapTIFF: character limit exceeded");
		}

		$BitmapTIFF = $this->parseTIFFfile($file, null);

		$this->packDefineBitsLosslessTag($this->CharacterID, $BitmapTIFF["format"], $BitmapTIFF["width"], $BitmapTIFF["height"], $BitmapTIFF["colortablesize"], $BitmapTIFF["zlibbitmapdata"]);
		$this->Bitmaps[$this->CharacterID] = array("width" => $BitmapTIFF["width"], "height" => $BitmapTIFF["height"]);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterID of this bitmap.

		return $this->CharacterID;
	}

	//--------------------------------------------------
	//  null DefineBitmapTIFFAlpha(string TIFFfile, 
	//                               array AlphaPalette)
	//  defines the DefineBitsLossless2 tag and returns
	//  its ID.

	function DefineBitmapTIFFAlpha($TIFFFile, $AlphaPalette)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineBitmapTIFFAlpha");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineBitmapTIFFAlpha: character limit exceeded");
		}

		//--------------------------------------------------
		//  read image and alpha bitmaps.

		$BitmapTIFF = $this->parseTIFFfile($TIFFFile, $AlphaPalette);

		$colormap = $BitmapTIFF["colortable"];

		if (strlen($colormap) < 6) {

			$this->FMError("DefineBitmapTIFFAlpha: color map must have at least 2 colors");
		}

		$colormap = str_pad($colormap, 1024, chr(0));

		$this->packDefineBitsLossless2Tag($this->CharacterID, $BitmapTIFF["format"], $BitmapTIFF["width"], $BitmapTIFF["height"], $BitmapTIFF["colortablesize"], $BitmapTIFF["zlibbitmapdata"]);
		$this->Bitmaps[$this->CharacterID] = array("width" => $BitmapTIFF["width"], "height" => $BitmapTIFF["height"], "Alpha" => true);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterID of this bitmap.

		return $this->CharacterID;
	}

	//--------------------------------------------------
	//  integer DefineTriangleBitmap(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//           integer X3, integer Y3, integer Width,
	//             boolean AlphaFlag, boolean EdgeFlag,
	//      integer R, integer G, integer B, integer A,
	//             string BitmapType, integer BitmapID,
	//         boolean AutoFitFlag, string BitmapMatrix)
	//  defines a triangle with the bitmap fill.

	function DefineTriangleBitmap($X1, $Y1, $X2, $Y2, $X3, $Y3, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $BitmapType, $BitmapID, $AutoFitFlag, $BitmapMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineTriangleBitmap");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineTriangleBitmap: character limit exceeded");
		}

		//--------------------------------------------------
		//  check if the bitmap has alpha channel 
		//  information.

		if (array_key_exists("Alpha", $this->Bitmaps[$BitmapID])) {

			$AlphaFlag = true;

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;
		$Y3 = $this->FrameSize["Ymax"] - $Y3;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X1, $Y1, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas for triangle edges

		$DeltaX1 = $X2 - $X1;
		$DeltaY1 = $Y2 - $Y1;
		$DeltaX2 = $X3 - $X2;
		$DeltaY2 = $Y3 - $Y2;
		$DeltaX3 = $X1 - $X3;
		$DeltaY3 = $Y1 - $Y3;

		//--------------------------------------------------
		//  test if one or two of the triangle's edges are 
		//  general, horizontal or vertical and use the 
		//  appropriate straight edge record.

		if (($DeltaX1 == 0) and ($DeltaY1 != 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX1, $DeltaY1);
		} elseif (($DeltaX1 != 0) and ($DeltaY1 == 0)) {

			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX1, $DeltaY1);
		} else {
			$EdgeRecords = $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX1, $DeltaY1);
		}

		if (($DeltaX2 == 0) and ($DeltaY2 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX2, $DeltaY2);
		} elseif (($DeltaX2 != 0) and ($DeltaY2 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX2, $DeltaY2);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX2, $DeltaY2);
		}

		if (($DeltaX3 == 0) and ($DeltaY3 != 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, $DeltaX3, $DeltaY3);
		} elseif (($DeltaX3 != 0) and ($DeltaY3 == 0)) {

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX3, $DeltaY3);
		} else {
			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX3, $DeltaY3);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2, $X3) - $margin;
		$X_max = max($X1, $X2, $X3) + $margin;
		$Y_min = min($Y1, $Y2, $Y3) - $margin;
		$Y_max = max($Y1, $Y2, $Y3) + $margin;

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);


		//--------------------------------------------------
		//  check if the bitmap is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$BitmapMatrix = $this->packMATRIX(true, ($X_max - $X_min) / $this->Bitmaps[$BitmapID]["width"], ($Y_max - $Y_min) / $this->Bitmaps[$BitmapID]["height"], false, 0, 0, $X_min, $Y_min); 

		}

		if ($BitmapType == "c") {

			$BType = 0x41;

		} elseif ($BitmapType == "t") {

			$BType = 0x40;

		} else {

			$this->SWFError("wrong bitmap type");

		}

		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($BType, "", "", "", $AlphaFlag, "", "", "", $BitmapID, $BitmapMatrix);
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineRectangleBitmap(integer X1,
	//              integer Y1, integer X2, integer Y2,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//         integer B, integer A, string BitmapType,
	//           integer BitmapID, boolean AutoFitFlag, 
	//                              string BitmapMatrix)
	//  defines a rectangle with the bitmap fill.

	function DefineRectangleBitmap($X1, $Y1, $X2, $Y2, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $BitmapType, $BitmapID, $AutoFitFlag, $BitmapMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineRectangleBitmap");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineRectangleBitmap: character limit exceeded");
		}

		//--------------------------------------------------
		//  check if the bitmap has alpha channel 
		//  information.

		if (array_key_exists("Alpha", $this->Bitmaps[$BitmapID])) {

			$AlphaFlag = true;

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;
		$Y2 = $this->FrameSize["Ymax"] - $Y2;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X1, $Y1, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute deltas.

		$DeltaX = $X2 - $X1;
		$DeltaY = $Y2 - $Y1;

		//--------------------------------------------------
		//  add vertical and horizontal straight edges.

		$EdgeRecords  = $this->packSTRAIGHTEDGERECORD(0, 1, 0, $DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, $DeltaX, 0);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 1, 0, -$DeltaY);
		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(0, 0, -$DeltaX, 0);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = min($X1, $X2) - $margin;
		$X_max = max($X1, $X2) + $margin;
		$Y_min = min($Y1, $Y2) - $margin;
		$Y_max = max($Y1, $Y2) + $margin;

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//--------------------------------------------------
		//  check if the bitmap is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$BitmapMatrix = $this->packMATRIX(true, ($X_max - $X_min) / $this->Bitmaps[$BitmapID]["width"], ($Y_max - $Y_min) / $this->Bitmaps[$BitmapID]["height"], false, 0, 0, $X_min, $Y_min); 

		}

		if ($BitmapType == "c") {

			$BType = 0x41;

		} elseif ($BitmapType == "t") {

			$BType = 0x40;

		} else {

			$this->SWFError("wrong bitmap type");

		}

		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($BType, "", "", "", $AlphaFlag, "", "", "", $BitmapID, $BitmapMatrix);
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefinePolygonBitmap(integer Segments,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//         integer B, integer A, string BitmapType,
	//           integer BitmapID, boolean AutoFitFlag,
	//                              string BitmapMatrix)
	//      integer FillG, integer FillB, integer FillA)
	//  defines a regular polygon with the bitmap fill.

	function DefinePolygonBitmap($Segments, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $BitmapType, $BitmapID, $AutoFitFlag, $BitmapMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefinePolygonBitmap");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefinePolygonBitmap: character limit exceeded");
		}

		//--------------------------------------------------
		//  check if the bitmap has alpha channel 
		//  information.

		if (array_key_exists("Alpha", $this->Bitmaps[$BitmapID])) {

			$AlphaFlag = true;

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1;
		$Y2 = $Y1 - $Radius;

		//--------------------------------------------------
		//  select line and fill style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X2, $Y2, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute step angle.

		$step = 2 * pi() / $Segments;

		for ($n = 0; $n < $Segments; $n++) {

			//--------------------------------------------------
			//  compute x and y deltas.

			$angle = -(pi() / 2) + $step * $n;

			$X3 = $X1 + $Radius * cos($angle);
			$Y3 = $Y1 + $Radius * sin($angle);
			$X4 = $X1 + $Radius * cos($angle + $step);
			$Y4 = $Y1 + $Radius * sin($angle + $step);

			$DeltaX = round($X4 - $X3);
			$DeltaY = round($Y4 - $Y3);

			//--------------------------------------------------
			//  add a straight edge.

			$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//--------------------------------------------------
		//  check if the bitmap is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$BitmapMatrix = $this->packMATRIX(true, ($X_max - $X_min) / $this->Bitmaps[$BitmapID]["width"], ($Y_max - $Y_min) / $this->Bitmaps[$BitmapID]["height"], false, 0, 0, $X_min, $Y_min); 

		}

		if ($BitmapType == "c") {

			$BType = 0x41;

		} elseif ($BitmapType == "t") {

			$BType = 0x40;

		} else {

			$this->SWFError("wrong bitmap type");

		}

		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($BType, "", "", "", $AlphaFlag, "", "", "", $BitmapID, $BitmapMatrix);
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineCircleBitmap(integer Accuracy,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//         integer B, integer A, string BitmapType,
	//           integer BitmapID, boolean AutoFitFlag,
	//                              string BitmapMatrix)
	//  defines a circle with the bitmap fill.

	function DefineCircleBitmap($Accuracy, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $BitmapType, $BitmapID, $AutoFitFlag, $BitmapMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineCircleBitmap");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineCircleBitmap: character limit exceeded");
		}

		//--------------------------------------------------
		//  check if the bitmap has alpha channel 
		//  information.

		if (array_key_exists("Alpha", $this->Bitmaps[$BitmapID])) {

			$AlphaFlag = true;

		}

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		$X2 = $X1 + $Radius;
		$Y2 = $Y1;

		//--------------------------------------------------
		//  select line and fill style, move pen to X2, Y2.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X2, $Y2, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = 2 * pi() / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//--------------------------------------------------
		//  check if the bitmap is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$BitmapMatrix = $this->packMATRIX(true, ($X_max - $X_min) / $this->Bitmaps[$BitmapID]["width"], ($Y_max - $Y_min) / $this->Bitmaps[$BitmapID]["height"], false, 0, 0, $X_min, $Y_min); 

		}

		if ($BitmapType == "c") {

			$BType = 0x41;

		} elseif ($BitmapType == "t") {

			$BType = 0x40;

		} else {

			$this->SWFError("wrong bitmap type");

		}

		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($BType, "", "", "", $AlphaFlag, "", "", "", $BitmapID, $BitmapMatrix);
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//  integer DefineArcClosedBitmap(integer Accuracy,
	//          integer X1, integer Y1, integer Radius,
	//                integer Width, boolean AlphaFlag,
	//          boolean EdgeFlag, integer R, integer G,
	//         integer B, integer A, string BitmapType,
	//           integer BitmapID, boolean AutoFitFlag,
	//                              string BitmapMatrix)
	//  defines a closed arc with the bitmap fill.

	function DefineArcClosedBitmap($Accuracy, $Angle1, $Angle2, $X1, $Y1, $Radius, $Width, $AlphaFlag, $EdgeFlag, $R, $G, $B, $A, $BitmapType, $BitmapID, $AutoFitFlag, $BitmapMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineArcClosedBitmap");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("DefineArcClosedBitmap: character limit exceeded");
		}

		//--------------------------------------------------
		//  check if the bitmap has alpha channel 
		//  information.

		if (array_key_exists("Alpha", $this->Bitmaps[$BitmapID])) {

			$AlphaFlag = true;

		}

		//--------------------------------------------------
		//  check for alpha in bitmap definition.

		if ($EdgeFlag) {

			//--------------------------------------------------
			//  define line styles (just one in this case).

			$LineStyle = $this->packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A);
			$LineStyleArray = $this->packLINESTYLEARRAY(1, $LineStyle);

			$nLineBits = 1;
			$LineStyleIndex = 1;

		} else {

			//--------------------------------------------------
			//  define line styles (none in this case).

			$LineStyle = "";
			$LineStyleArray = $this->packLINESTYLEARRAY(0, $LineStyle);

			$nLineBits = 0;
			$LineStyleIndex = 0;
		}

		//--------------------------------------------------
		//  translate coordinates.

		$Y1 = $this->FrameSize["Ymax"] - $Y1;

		//--------------------------------------------------
		//  select line and fill style, move pen to X1, Y1.

		$StyleChangeRecord = $this->packSTYLECHANGERECORD(0, $EdgeFlag, 1, 0, 1, $X1, $Y1, 1, $nLineBits, 0, 1, $LineStyleIndex, "", "", 0, 0);		

		//--------------------------------------------------
		//  compute fist straight line deltas.

		$DeltaX = round($Radius * cos($Angle1));
		$DeltaY = round($Radius * sin($Angle1));

		//--------------------------------------------------
		//  add fist straight line.

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);
		//--------------------------------------------------
		//  compute angles and radii. 

		$Alpha = ($Angle2 - $Angle1) / $Accuracy;
		$Beta = $Alpha / 2;
		$ControlRadius = $Radius / cos($Beta); 

		//--------------------------------------------------
		//  reset anchor deltas. 

		$AnchorDeltaX = 0;
		$AnchorDeltaY = 0;

		//--------------------------------------------------
		//  compute anchor and control point deltas. 

		for ($n = 0; $n < $Accuracy; $n++) {

			$step = $n * $Alpha;

			$X3 = round($Radius * cos($Angle1 + $step));
			$Y3 = round($Radius * sin($Angle1 + $step));
			$X4 = round($ControlRadius * cos($Angle1 + $Beta + $step));
			$Y4 = round($ControlRadius * sin($Angle1 + $Beta + $step));
			$X5 = round($Radius * cos($Angle1 + $step + $Alpha));
			$Y5 = round($Radius * sin($Angle1 + $step + $Alpha));

			$ControlDeltaX = $X4 - $X3;
			$ControlDeltaY = $Y4 - $Y3;
			$AnchorDeltaX = $X5 - $X4;
			$AnchorDeltaY = $Y5 - $Y4;

			//--------------------------------------------------
			//  add a curved line.

			$EdgeRecords .= $this->packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY);

		}

		//--------------------------------------------------
		//  compute second line deltas. 

		$DeltaX = -round($Radius * cos($Angle2));
		$DeltaY = -round($Radius * sin($Angle2));

		//--------------------------------------------------
		//  add second line. 

		$EdgeRecords .= $this->packSTRAIGHTEDGERECORD(1, 0, $DeltaX, $DeltaY);

		//--------------------------------------------------
		//  mark the end of the shape.

		$EndShape = $this->packENDSHAPERECORD();

		//--------------------------------------------------
		//  compute shape bounds.

		$margin = round($Width / 2);

		$X_min = $X1 - ($Radius + $margin);
		$X_max = $X1 + ($Radius + $margin);
		$Y_min = $Y1 - ($Radius + $margin);
		$Y_max = $Y1 + ($Radius + $margin);

		//--------------------------------------------------
		//  pack shape records.

		$ShapeRecords = $this->packBitValues($StyleChangeRecord["Bitstream"] . $EdgeRecords . $EndShape);

		//--------------------------------------------------
		//  check if the bitmap is to be fitted 
		//  automatically.

		if ($AutoFitFlag) {

			$BitmapMatrix = $this->packMATRIX(true, ($X_max - $X_min) / $this->Bitmaps[$BitmapID]["width"], ($Y_max - $Y_min) / $this->Bitmaps[$BitmapID]["height"], false, 0, 0, $X_min, $Y_min); 

		}

		if ($BitmapType == "c") {

			$BType = 0x41;

		} elseif ($BitmapType == "t") {

			$BType = 0x40;

		} else {

			$this->SWFError("wrong bitmap type");

		}

		//--------------------------------------------------
		//  define fill styles (just one in this case).

		$FillStyle = $this->packFILLSTYLE($BType, "", "", "", $AlphaFlag, "", "", "", $BitmapID, $BitmapMatrix);
		$FillStyleArray = $this->packFILLSTYLEARRAY(1, $FillStyle); 

		$ShapeWithStyle = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, 1, $nLineBits, $ShapeRecords);

		//--------------------------------------------------
		//  test if AlphaFlag is set and use the appropriate
		//  shape tag.

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		} else {

			$this->packDefineShapeTag($this->CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $ShapeWithStyle);

		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $this->CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//
	//  FreeForm Shape Functions
	//
	//--------------------------------------------------

	//--------------------------------------------------
	// integer BeginShape()
	// returns a Character ID for the new shape.

	function BeginShape()
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "BeginShape");

		//--------------------------------------------------
		//  increment the Character ID counter.

		++$this->CharacterID;

		//--------------------------------------------------
		//  check character ID limit.

		if ($this->CharacterID > $this->CharacterIDLimit) {

			$this->FMError("BeginShape: character limit exceeded");
		}

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $this->CharacterID;
	}

	//--------------------------------------------------
	// array DefineSolidLine(integer Width, 
	//         boolean AlphaFlag, integer R, integer G,
	//                         integer B, integer Alpha)
	// creates a solid line style definition and 
	// returns it.

	function DefineSolidLine($Width, $AlphaFlag, $R, $G, $B, $Alpha)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineSolidLine");

		if ($AlphaFlag) {

			$Style = array("Width" => $Width, "R" => $R, "G" => $G, "B" => $B, "A" => $Alpha);

		} else {

			$Style = array("Width" => $Width, "R" => $R, "G" => $G, "B" => $B);

		}

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the solid line style.

		return $Style;
	}

	//--------------------------------------------------
	// array DefineSolidFill(boolean AlphaFlag, 
	//   integer R, integer G, integer B, integer Alpha)
	// creates a solid fill style definition and 
	// returns it.

	function DefineSolidFill($AlphaFlag, $R, $G, $B, $Alpha)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DefineSolidFill");

		if ($AlphaFlag) {

			$fill = array("Type" => "solid", "R" => $R, "G" => $G, "B" => $B, "A" => $Alpha);

		} else {

			$fill = array("Type" => "solid", "R" => $R, "G" => $G, "B" => $B);
		}

		array_pop($this->FMDebug);

		return $fill;
	}

	//--------------------------------------------------
	// null SelectLineStyle(integer CharacterID,
	//                                       array Line) 
	// selects a line style.

	function SelectLineStyle($CharacterID, $Line)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "SelectLineStyle");

		if ($Line == 0) {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "line", "Definition" => "zero", "Alpha" => false);

		} else {

			foreach ($Line as $element) {

				$Line["string"] .= ":" . sprintf("%s", $element);
			}

			if (array_key_exists("A", $Line)) {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "line", "Definition" => $Line, "Alpha" => true);

			} else {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "line", "Definition" => $Line, "Alpha" => false);
			}
		}

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	// null SelectFill0Style(integer CharacterID,
	//       array Fill, string FillType, string Matrix)
	// selects a Fill0 style.

	function SelectFill0Style($CharacterID, $Fill, $FillType, $Matrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "SelectFill0Style");

		if ($Fill == 0) {

			$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => null, "Matrix" => $Matrix, "Definition" => "zero", "Alpha" => false);
		} elseif (($FillType == "c") or ($FillType == "t")) {

			$FillB["ID"] = $Fill;
			$FillB["string"] .= sprintf("%s", $Fill);

			if ($this->Bitmaps[$Fill]["Alpha"] == true) {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $FillB, "Alpha" => true);
			} else {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $FillB, "Alpha" => false);
			}

		} else {

			foreach ($Fill as $element) {

				$Fill["string"] .= sprintf("%s", $element);
			}

			if (array_key_exists("Alpha", $Fill) or array_key_exists("A", $Fill)) {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $Fill, "Alpha" => true);
			} else {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $Fill, "Alpha" => false);
			}
		}

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	// null SelectFill1Style(integer CharacterID,
	//       array Fill, string FillType, string Matrix)
	// selects a Fill1 style.

	function SelectFill1Style($CharacterID, $Fill, $FillType, $Matrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "SelectFill1Style");

		if ($Fill == 0) {

			$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill1", "Type" => null, "Matrix" => $Matrix, "Definition" => "zero", "Alpha" => false);
		} elseif (($FillType == "c") or ($FillType == "t")) {

			$FillB["ID"] = $Fill;
			$FillB["string"] .= sprintf("%s", $Fill);

			if ($this->Bitmaps[$Fill]["Alpha"] == true) {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $FillB, "Alpha" => true);
			} else {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill0", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $FillB, "Alpha" => false);
			}

		} else {

			foreach ($Fill as $element) {

				$Fill["string"] .= sprintf("%s", $element);
			}

			if (array_key_exists("Alpha", $Fill) or array_key_exists("A", $Fill)) {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill1", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $Fill, "Alpha" => true);
			} else {

				$this->Shapes[$CharacterID][] = array("Record" => "changestyle", "Style" => "fill1", "Type" => $FillType, "Matrix" => $Matrix, "Definition" => $Fill, "Alpha" => false);
			}
		}

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	// null MoveTo(integer CharacterID, integer X
	//                                        integer Y)
	// moves pen to a new location.

	function MoveTo($CharacterID, $X, $Y)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "MoveTo");

		$this->Shapes[$CharacterID][] = array("Record" => "moveto", "X" => $X, "Y" => $Y);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	// null LineTo(integer CharacterID, integer X
	//                                        integer Y)
	// draws a straight line to X, Y.

	function LineTo($CharacterID, $X, $Y)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "LineTo");

		$this->Shapes[$CharacterID][] = array("Record" => "edge", "Type" => "lineto", "AnchorX" => $X, "AnchorY" => $Y);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	// null CurveTo(integer CharacterID,
	//              integer ControlX, integer ControlY, 
	//                 integer AnchorX, integer AnchorY)
	// draws a 2nd degree Bezier curve.

	function CurveTo($CharacterID, $ControlX, $ControlY, $AnchorX, $AnchorY)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "LineTo");

		$this->Shapes[$CharacterID][] = array("Record" => "edge", "Type" => "curveto", "ControlX" => $ControlX, "ControlY" => $ControlY, "AnchorX" => $AnchorX, "AnchorY" => $AnchorY);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	// null EndShape(integer CharacterID)
	// packs shape and creates appropriate shape tag.

	function EndShape($CharacterID)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "EndShape");

		$AlphaFlag = false;

		//--------------------------------------------------
		//  detect alpha.

		$limit  = sizeof($this->Shapes[$CharacterID]);

		foreach($this->Shapes[$CharacterID] as $Record) {

			if ($Record["Alpha"]) {

				$AlphaFlag = true;
			}
		}

		//--------------------------------------------------
		//  sort styles.

		$FillStyles = array();
		$LineStyles = array();

		foreach($this->Shapes[$CharacterID] as $Record) {

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill0") and ($Record["Definition"] != 0)) {

				$FillStyles[] = $Record;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill1") and ($Record["Definition"] != 0)) {

				$FillStyles[] = $Record;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "line") and ($Record["Definition"] != 0)) {


				$LineStyles[] = $Record;
			}
		}

		//--------------------------------------------------
		//  remove duplicate styles.

		$limitf = sizeof($FillStyles);
		$limitl = sizeof($LineStyles);

		if ($limitf > 0) {

			$t = 0;

			$tmpFillStyles = array();
			$tmpFillStyles[] = $FillStyles[0];

			for ($counter = 0; $counter < $limitf; $counter++) {

				$limittmp = sizeof($tmpFillStyles);

				for ($countertmp = 0; $countertmp < $limittmp; $countertmp++) {

					if ($FillStyles[$counter]["Definition"]["string"] == $tmpFillStyles[$countertmp]["Definition"]["string"]) {

						$t = 1;
					}

				}

				if ($t == 0) {

					$tmpFillStyles[] = $FillStyles[$counter];

				} else { 

					$t = 0;
				}
			}
		} 

		$FillStyles = $tmpFillStyles;

		if ($limitl > 0) {

			$t = 0;

			$tmpLineStyles = array();
			$tmpLineStyles[] = $LineStyles[0];

			for ($counter = 0; $counter < $limitl; $counter++) {

				$limittmp = sizeof($tmpLineStyles);

				for ($countertmp = 0; $countertmp < $limittmp; $countertmp++) {

					if ($LineStyles[$counter]["Definition"]["string"] == $tmpLineStyles[$countertmp]["Definition"]["string"]) {

						$t = 1;
					}

				}

				if ($t == 0) {

					$tmpLineStyles[] = $LineStyles[$counter];

				} else { 

					$t = 0;
				}
			}
		} 

		$LineStyles = $tmpLineStyles;

		//--------------------------------------------------
		//  check the number of styles used in this shape. 

		$limitf = sizeof($FillStyles);
		$limitl = sizeof($LineStyles);

		if ($limitf > 255) {

			$LongShapeTag = true;

		}

		if ($limitl > 255) {

			$LongShapeTag = true;

		}

		$upperstylelimit = pow(2, 15) - 1;

		if ($limitf > $upperstylelimit) {

			$this->FMError("EndShape: too many fill styles in this shape");
		}

		if ($limitl > $upperstylelimit) {

			$this->FMError("EndShape: too many line styles in this shape");
		}

		//--------------------------------------------------
		//  assign numbers to styles.

		$Edges = array();

		for ($counter = 0; $counter < $limit; $counter++) {

			if (($this->Shapes[$CharacterID][$counter]["Record"] == "changestyle") 
				and ($this->Shapes[$CharacterID][$counter]["Style"] == "fill0")) { 

				$limitf = sizeof($FillStyles);

				for ($counterf = 0; $counterf < $limitf; $counterf++) {

					if ($this->Shapes[$CharacterID][$counter]["Definition"] == "zero") {

						$this->Shapes[$CharacterID][$counter]["StyleID"] = 0; 

						break;
					}

					if ($this->Shapes[$CharacterID][$counter]["Definition"]["string"] == $FillStyles[$counterf]["Definition"]["string"]) {

						$this->Shapes[$CharacterID][$counter]["StyleID"] = $counterf + 1; 

						break;
					}
				}

				continue;
			}

			if (($this->Shapes[$CharacterID][$counter]["Record"] == "changestyle") 
				and ($this->Shapes[$CharacterID][$counter]["Style"] == "fill1")) { 

				$limitf = sizeof($FillStyles);

				for ($counterf = 0; $counterf < $limitf; $counterf++) {

					if ($this->Shapes[$CharacterID][$counter]["Definition"] == "zero") {

						$this->Shapes[$CharacterID][$counter]["StyleID"] = 0; 

						break;
					}

					if ($this->Shapes[$CharacterID][$counter]["Definition"]["string"] == $FillStyles[$counterf]["Definition"]["string"]) {

						$this->Shapes[$CharacterID][$counter]["StyleID"] = $counterf + 1; 

						break;
					}
				}

				continue;
			}

			if (($this->Shapes[$CharacterID][$counter]["Record"] == "changestyle") 
				and ($this->Shapes[$CharacterID][$counter]["Style"] == "line")) { 

				$limitl = sizeof($LineStyles);

				for ($counterl = 0; $counterl < $limitl; $counterl++) {

					if ($this->Shapes[$CharacterID][$counter]["Definition"] == "zero") {
						$this->Shapes[$CharacterID][$counter]["StyleID"] = 0; 

						break;
					}

					if ($this->Shapes[$CharacterID][$counter]["Definition"]["string"] == $LineStyles[$counterl]["Definition"]["string"]) {

						$this->Shapes[$CharacterID][$counter]["StyleID"] = $counterl + 1; 

						continue;
					}
				}

				continue;
			}
		}

		//--------------------------------------------------
		//  pack fill styles.

		$Fills = "";
		$Lines = "";

		$FillStyle0 = 0;
		$FillStyle1 = 0;
		$LineStyle = 0;

		if ($limitf > 0) {

			for ($counter = 0; $counter < $limitf; $counter++) {

				//--------------------------------------------------
				//  solid fill style?

				if($FillStyles[$counter]["Type"] == "solid") {

					if ($AlphaFlag) {

						$Fills .= $this->packFILLSTYLE(0x00, $FillStyles[$counter]["Definition"]["R"], $FillStyles[$counter]["Definition"]["G"], $FillStyles[$counter]["Definition"]["B"], $AlphaFlag, $FillStyles[$counter]["Definition"]["A"], null, null, null, null);
					} else {

						$Fills .= $this->packFILLSTYLE(0x00, $FillStyles[$counter]["Definition"]["R"], $FillStyles[$counter]["Definition"]["G"], $FillStyles[$counter]["Definition"]["B"], $AlphaFlag, null, null, null, null, null);
					}
				}	

				//--------------------------------------------------
				//  gradient fill style?

				if(($FillStyles[$counter]["Type"] == "l") or ($FillStyles[$counter]["Type"] == "r")) {

					if ($FillStyles[$counter]["Type"] == "l") {

						$GradType = 0x10;
					}
				
					if ($FillStyles[$counter]["Type"] == "r") {

						$GradType = 0x12;
					}
			
					$limitg = sizeof($FillStyles[$counter]["Definition"]);
	
					for ($counterg = 0; $counterg <= $limitg; $counterg++) {

						if (is_array($FillStyles[$counter]["Definition"][$counterg])) {

							$GradientRecord = $FillStyles[$counter]["Definition"][$counterg];

							$Ratio = $GradientRecord["Ratio"];
							$R = $GradientRecord["R"];
							$G = $GradientRecord["G"];
							$B = $GradientRecord["B"];

							if (array_key_exists("A", $GradientRecord)) {

								$A = $GradientRecord["A"];

							} else {

								$A = 255;
							}

							$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
						}
					}

					$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

					$Fills .= $this->packFILLSTYLE($GradType, null, null, null, $AlphaFlag, null, $FillStyles[$counter]["Matrix"], $Gradient, null, null);
				}	

				//--------------------------------------------------
				//  bitmap fill style?

				if(($FillStyles[$counter]["Type"] == "c") or ($FillStyles[$counter]["Type"] == "t")) {

					if ($FillStyles[$counter]["Type"] == "c") {

						$BType = 0x41;
					}

					if ($FillStyles[$counter]["Type"] == "t") {

						$BType = 0x40;
					}

					$Fills .= $this->packFILLSTYLE($BType, null, null, null, $AlphaFlag, null, null, null, $FillStyles[$counter]["Definition"]["ID"], $FillStyles[$counter]["Matrix"]);
				}	
			}
		}

		$FillStyleArray = $this->packFILLSTYLEARRAY($limitf, $Fills); 

		//--------------------------------------------------
		//  pack line styles.

		$Width_max = 0;

		if ($limitl > 0) {

			for ($counter = 0; $counter < $limitl; $counter++) {

				if ($AlphaFlag) {

					$Lines .= $this->packLINESTYLE($LineStyles[$counter]["Definition"]["Width"], $LineStyles[$counter]["Definition"]["R"], $LineStyles[$counter]["Definition"]["G"], $LineStyles[$counter]["Definition"]["B"], $AlphaFlag, $LineStyles[$counter]["Definition"]["A"]);

				} else {

					$Lines .= $this->packLINESTYLE($LineStyles[$counter]["Definition"]["Width"], $LineStyles[$counter]["Definition"]["R"], $LineStyles[$counter]["Definition"]["G"], $LineStyles[$counter]["Definition"]["B"], $AlphaFlag, null);
				}

				if ($Width_max < $LineStyles[$counter]["Definition"]["Width"]) {

					$Width_max = $LineStyles[$counter]["Definition"]["Width"];
				}
			}
		}

		$LineStyleArray = $this->packLINESTYLEARRAY($limitl, $Lines);

		//--------------------------------------------------
		//  pack shape records.

		$StateFillStyle0 = false;
		$StateStyle1 = false;
		$StateLineStyle = false;

		$FillStyle0 = 0;
		$FillStyle1 = 0;
		$LineStyle = 0;

		$X_min = 2147483647;
		$X_max = -2147483647;
		$Y_min = 2147483647;
		$Y_max = -2147483647;

		$X_tmp = 0;
		$Y_tmp = 0;

		reset($this->Shapes[$CharacterID]);

		foreach($this->Shapes[$CharacterID] as $Record) {

			if ($Record["Record"] == "moveto") {

				$MoveToX = $Record["X"];
				$MoveToY = $this->FrameSize["Ymax"] - $Record["Y"];

				$X_tmp = $MoveToX;
				$Y_tmp = $MoveToY;

				if ($MoveToX < $X_min) {

					$X_min = $MoveToX;
					$X_tmp = $MoveToX;
				}

				if ($MoveToX > $X_max) {

					$X_max = $MoveToX;
					$X_tmp = $MoveToX;
				}

				if ($MoveToY < $Y_min) {

					$Y_min = $MoveToY;
					$Y_tmp = $MoveToY;
				}

				if ($MoveToY > $Y_max) {

					$Y_max = $MoveToY;
					$Y_tmp = $MoveToY;
				}

				$StateMoveTo = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill0")) {

				$FillStyle0 = $Record["StyleID"];

				$StateFillStyle0 = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill1")) {

				$FillStyle1 = $Record["StyleID"];

				$StateFillStyle1 = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "line")) {

				$LineStyle = (int) $Record["StyleID"];

				$StateLineStyle = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "edge") and ($Record["Type"] == "lineto")) {

				if ($ChangeStyleFlag) {

					if ($limitf > 0) {

						$nFillBits = ceil(log($limitf + 1) / log(2));

					} elseif ($limitf == 0) {

						$nFillBits = 0;
					}

					if ($limitl > 0) {

						$nLineBits = ceil(log($limitl + 1) / log(2));
					} elseif ($limitl == 0) {

						$nLineBits = 0;
					}

					$StyleChangeRecord = $this->packSTYLECHANGERECORD(false, $StateLineStyle, $StateFillStyle1, $StateFillStyle0, $StateMoveTo, $MoveToX, $MoveToY, $nFillBits, $nLineBits, $FillStyle0, $FillStyle1, $LineStyle, null, null, null, null);
					$Shape .= $StyleChangeRecord["Bitstream"];		

					$StateMoveTo = false;
					$StateFillStyle0 = false;
					$StateFillStyle1 = false;
					$StateLineStyle = false;
					$ChangeStyleFlag = false;
				}

				if ($Record["AnchorX"] == 0) {

					$Shape .= $this->packSTRAIGHTEDGERECORD(0, 1, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				if ($Record["AnchorY"] == 0) {

					$Shape .= $this->packSTRAIGHTEDGERECORD(0, 0, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				if (($Record["AnchorX"] != 0) and ($Record["AnchorY"] != 0)) {

					$Shape .= $this->packSTRAIGHTEDGERECORD(1, 0, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				$X_tmp += $Record["AnchorX"]; 
				$Y_tmp -= $Record["AnchorY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				continue;
			}

			if (($Record["Record"] == "edge") and ($Record["Type"] == "curveto")) {

				if ($ChangeStyleFlag) {

					if ($limitf > 1) {

						$nFillBits = ceil(log($limitf) / log(2));

					} elseif ($limitf == 1) {

						$nFillBits = 1;

					} elseif ($limitf == 0) {

						$nFillBits = 0;
					}

					if ($limitl > 1) {

						$nLineBits = ceil(log($limitl) / log(2));

					} elseif ($limitl == 1) {

						$nLineBits = 1;

					} elseif ($limitf == 0) {

						$nFillBits = 0;
					}

					$StyleChangeRecord = $this->packSTYLECHANGERECORD(false, $StateLineStyle, $StateFillStyle1, $StateFillStyle0, $StateMoveTo, $MoveToX, $MoveToY, $nFillBits, $nLineBits, $FillStyle0, $FillStyle1, $LineStyle, null, null, null, null);
					$Shape .= $StyleChangeRecord["Bitstream"];		

					$StateMoveTo = false;
					$StateFillStyle0 = false;
					$StateFillStyle1 = false;
					$StateLineStyle = false;
					$ChangeStyleFlag = false;
				}

				$Shape .= $this->packCURVEDEDGERECORD($Record["ControlX"], -$Record["ControlY"], $Record["AnchorX"], -$Record["AnchorY"]);

				$X_tmp += $Record["AnchorX"]; 
				$Y_tmp += $Record["AnchorY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				$X_tmp += $Record["ControlX"]; 
				$Y_tmp += $Record["ControlY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				continue;
			}
		}

		$Shape .= $this->packENDSHAPERECORD();

		$Shape = $this->packBitValues($Shape);

		$X_min -= round($Width_max / 2);
		$X_max += round($Width_max / 2);
		$Y_min -= round($Width_max / 2);
		$Y_max += round($Width_max / 2);

		$Shape = $this->packSHAPEWITHSTYLE($FillStyleArray, $LineStyleArray, $limitf, $limitl, $Shape);

		if ($AlphaFlag) {

			$this->packDefineShape3Tag($CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $Shape);

		} else {

			if ($LongShapeTag) {

				$this->packDefineShape2Tag($CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $Shape);

			} else {

				$this->packDefineShapeTag($CharacterID, $this->packRECT($X_min, $X_max, $Y_min, $Y_max), $Shape);

			}
		}

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

	//--------------------------------------------------
	//
	//  FreeForm Morph Shape Functions
	//
	//--------------------------------------------------

	//--------------------------------------------------
	// string BeginMorphShape(integer FromCharacterID)
	// returns a Character ID for the new morph shape.

	function BeginMorphShape($FromCharacterID)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "BeginMorphShape");

		$CharacterID = "t $FromCharacterID";

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterID;
	}

	//--------------------------------------------------
	// null EndMorphShape(integer FromCharacterID,
	//                             string ToCharacterID)
	// packs shape and creates appropriate shape tag.

	function EndMorphShape($FromCharacterID, $ToCharacterID)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "EndMorphShape");

		$AlphaFlag = true;

		//--------------------------------------------------
		//  sort -from- styles.

		$f_FillStyles = array();
		$f_LineStyles = array();

		foreach($this->Shapes[$FromCharacterID] as $Record) {

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill0") and ($Record["Definition"] != 0)) {

				$f_FillStyles[] = $Record;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill1") and ($Record["Definition"] != 0)) {

				$f_FillStyles[] = $Record;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "line") and ($Record["Definition"] != 0)) {


				$f_LineStyles[] = $Record;
			}
		}

		//--------------------------------------------------
		//  sort -to- styles.

		$t_FillStyles = array();
		$t_LineStyles = array();

		foreach($this->Shapes[$ToCharacterID] as $Record) {

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill0") and ($Record["Definition"] != 0)) {

				$t_FillStyles[] = $Record;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill1") and ($Record["Definition"] != 0)) {

				$t_FillStyles[] = $Record;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "line") and ($Record["Definition"] != 0)) {


				$t_LineStyles[] = $Record;
			}
		}

		$f_limitf = sizeof($f_FillStyles);
		$f_limitl = sizeof($f_LineStyles);
		$t_limitf = sizeof($t_FillStyles);
		$t_limitl = sizeof($t_LineStyles);

		if ($f_limitf != $t_limitf) {

			$this->FMError("EndMorphShape: the number of fill styles in -from- and -to- shapes is not equal");

		}

		if ($f_limitl != $t_limitl) {

			$this->FMError("EndMorphShape: the number of line styles in -from- and -to- shapes is not equal");

		}

		//--------------------------------------------------
		//  remove duplicate -from- styles.

		if ($f_limitf > 0) {

			$t = 0;

			$tmpFillStyles = array();
			$tmpFillStyles[] = $f_FillStyles[0];

			for ($counter = 0; $counter < $f_limitf; $counter++) {

				$limittmp = sizeof($tmpFillStyles);

				for ($countertmp = 0; $countertmp < $limittmp; $countertmp++) {

					if ($f_FillStyles[$counter]["Definition"]["string"] == $tmpFillStyles[$countertmp]["Definition"]["string"]) {

						$t = 1;
					}

				}

				if ($t == 0) {

					$tmpFillStyles[] = $f_FillStyles[$counter];

				} else { 

					$t = 0;
				}
			}
		} 

		$f_FillStyles = $tmpFillStyles;

		if ($f_limitl > 0) {

			$t = 0;

			$tmpLineStyles = array();
			$tmpLineStyles[] = $f_LineStyles[0];

			for ($counter = 0; $counter < $f_limitl; $counter++) {

				$limittmp = sizeof($tmpLineStyles);

				for ($countertmp = 0; $countertmp < $limittmp; $countertmp++) {

					if ($f_LineStyles[$counter]["Definition"]["string"] == $tmpLineStyles[$countertmp]["Definition"]["string"]) {

						$t = 1;
					}

				}

				if ($t == 0) {

					$tmpLineStyles[] = $f_LineStyles[$counter];

				} else { 

					$t = 0;
				}
			}
		} 

		$f_LineStyles = $tmpLineStyles;

		//--------------------------------------------------
		//  remove duplicate -to- styles.

		if ($t_limitf > 0) {

			$t = 0;

			$tmpFillStyles = array();
			$tmpFillStyles[] = $t_FillStyles[0];

			for ($counter = 0; $counter < $t_limitf; $counter++) {

				$limittmp = sizeof($tmpFillStyles);

				for ($countertmp = 0; $countertmp < $limittmp; $countertmp++) {

					if ($t_FillStyles[$counter]["Definition"]["string"] == $tmpFillStyles[$countertmp]["Definition"]["string"]) {

						$t = 1;
					}

				}

				if ($t == 0) {

					$tmpFillStyles[] = $t_FillStyles[$counter];

				} else { 

					$t = 0;
				}
			}
		} 

		$t_FillStyles = $tmpFillStyles;

		if ($t_limitl > 0) {

			$t = 0;

			$tmpLineStyles = array();
			$tmpLineStyles[] = $t_LineStyles[0];

			for ($counter = 0; $counter < $t_limitl; $counter++) {

				$limittmp = sizeof($tmpLineStyles);

				for ($countertmp = 0; $countertmp < $limittmp; $countertmp++) {

					if ($t_LineStyles[$counter]["Definition"]["string"] == $tmpLineStyles[$countertmp]["Definition"]["string"]) {

						$t = 1;
					}

				}

				if ($t == 0) {

					$tmpLineStyles[] = $t_LineStyles[$counter];

				} else { 

					$t = 0;
				}
			}
		} 

		$t_LineStyles = $tmpLineStyles;

		$f_limitf = sizeof($f_FillStyles);
		$f_limitl = sizeof($f_LineStyles);
		$t_limitf = sizeof($t_FillStyles);
		$t_limitl = sizeof($t_LineStyles);

		if ($f_limitf != $t_limitf) {

			$this->FMError("EndMorphShape: the reduced number of fill styles in -from- and -to- shapes is not equal");

		}

		if ($f_limitl != $t_limitl) {

			$this->FMError("EndMorphShape: the reduced number of line styles in -from- and -to- shapes is not equal");

		}

		$upperstylelimit = pow(2, 15) - 1;

		//--------------------------------------------------
		//  check the number of styles used in the -from-
		//  shape. 

		if ($f_limitf > 255) {

			$LongShapeTag = true;

		}

		if ($f_limitl > 255) {

			$LongShapeTag = true;

		}

		if ($f_limitf > $upperstylelimit) {

			$this->FMError("EndMorphShape: too many fill styles in this shape");
		}

		if ($f_limitl > $upperstylelimit) {

			$this->FMError("EndMorphShape: too many line styles in this shape");
		}

		//--------------------------------------------------
		//  check the number of styles used in the -to-
		//  shape. 

		if ($t_limitf > 255) {

			$LongShapeTag = true;

		}

		if ($t_limitl > 255) {

			$LongShapeTag = true;

		}

		if ($t_limitf > $upperstylelimit) {

			$this->FMError("EndMorphShape: too many fill styles in this shape");
		}

		if ($t_limitl > $upperstylelimit) {

			$this->FMError("EndMorphShape: too many line styles in this shape");
		}

		//--------------------------------------------------
		//  assign numbers to styles.

		$limit = sizeof($this->Shapes[$FromCharacterID]);

		for ($counter = 0; $counter < $limit; $counter++) {

			if (($this->Shapes[$FromCharacterID][$counter]["Record"] == "changestyle") 
				and ($this->Shapes[$FromCharacterID][$counter]["Style"] == "fill0")) { 

				$limitf = sizeof($f_FillStyles);

				for ($counterf = 0; $counterf < $limitf; $counterf++) {

					if ($this->Shapes[$FromCharacterID][$counter]["Definition"] == "zero") {

						$this->Shapes[$FromCharacterID][$counter]["StyleID"] = 0; 
						$this->Shapes[$ToCharacterID][$counter]["StyleID"] = 0; 

						break;
					}

					if ($this->Shapes[$FromCharacterID][$counter]["Definition"]["string"] == $f_FillStyles[$counterf]["Definition"]["string"]) {

						$this->Shapes[$FromCharacterID][$counter]["StyleID"] = $counterf + 1; 
						$this->Shapes[$ToCharacterID][$counter]["StyleID"] = $counterf + 1; 

						break;
					}
				}

				continue;
			}

			if (($this->Shapes[$FromCharacterID][$counter]["Record"] == "changestyle") 
				and ($this->Shapes[$FromCharacterID][$counter]["Style"] == "fill1")) { 

				$limitf = sizeof($f_FillStyles);

				for ($counterf = 0; $counterf < $limitf; $counterf++) {

					if ($this->Shapes[$FromCharacterID][$counter]["Definition"] == "zero") {

						$this->Shapes[$FromCharacterID][$counter]["StyleID"] = 0; 
						$this->Shapes[$ToCharacterID][$counter]["StyleID"] = 0; 

						break;
					}

					if ($this->Shapes[$FromCharacterID][$counter]["Definition"]["string"] == $f_FillStyles[$counterf]["Definition"]["string"]) {

						$this->Shapes[$FromCharacterID][$counter]["StyleID"] = $counterf + 1; 
						$this->Shapes[$ToCharacterID][$counter]["StyleID"] = $counterf + 1; 

						break;
					}
				}

				continue;
			}

			if (($this->Shapes[$FromCharacterID][$counter]["Record"] == "changestyle") 
				and ($this->Shapes[$FromCharacterID][$counter]["Style"] == "line")) { 

				$limitl = sizeof($f_LineStyles);

				for ($counterl = 0; $counterl < $limitl; $counterl++) {

					if ($this->Shapes[$FromCharacterID][$counter]["Definition"] == "zero") {
						$this->Shapes[$FromCharacterID][$counter]["StyleID"] = 0; 
						$this->Shapes[$ToCharacterID][$counter]["StyleID"] = 0; 

						break;
					}

					if ($this->Shapes[$FromCharacterID][$counter]["Definition"]["string"] == $f_LineStyles[$counterl]["Definition"]["string"]) {

						$this->Shapes[$FromCharacterID][$counter]["StyleID"] = $counterl + 1; 
						$this->Shapes[$ToCharacterID][$counter]["StyleID"] = $counterl + 1; 

						continue;
					}
				}

				continue;
			}
		}

		//--------------------------------------------------
		//  pack fill styles.

		$Fills = "";
		$Lines = "";

		$FillStyle0 = 0;
		$FillStyle1 = 0;
		$LineStyle = 0;

		if ($f_limitf > 0) {

			for ($counter = 0; $counter < $f_limitf; $counter++) {

				//--------------------------------------------------
				//  solid fill style?

				if ($f_FillStyles[$counter]["Type"] == "solid") {

					if ($t_FillStyles[$counter]["Type"] != "solid") {

						$this->FMError("EndMorphShape: -to- fill style not solid");
					}

					if (array_key_exists("A", $f_FillStyles[$counter]["Definition"])) {
						$Fills .= $this->packFILLSTYLE(0x00, $f_FillStyles[$counter]["Definition"]["R"], $f_FillStyles[$counter]["Definition"]["G"], $f_FillStyles[$counter]["Definition"]["B"], $AlphaFlag, $f_FillStyles[$counter]["Definition"]["A"], null, null, null, null);

					} else {

						$Fills .= $this->packFILLSTYLE(0x00, $f_FillStyles[$counter]["Definition"]["R"], $f_FillStyles[$counter]["Definition"]["G"], $f_FillStyles[$counter]["Definition"]["B"], $AlphaFlag, 255, null, null, null, null);

					}

					if (array_key_exists("A", $t_FillStyles[$counter]["Definition"])) {
						$Fills .= substr($this->packFILLSTYLE(0x00, $t_FillStyles[$counter]["Definition"]["R"], $t_FillStyles[$counter]["Definition"]["G"], $t_FillStyles[$counter]["Definition"]["B"], $AlphaFlag, $t_FillStyles[$counter]["Definition"]["A"], null, null, null, null), 1);

					} else {

						$Fills .= substr($this->packFILLSTYLE(0x00, $t_FillStyles[$counter]["Definition"]["R"], $t_FillStyles[$counter]["Definition"]["G"], $t_FillStyles[$counter]["Definition"]["B"], $AlphaFlag, 255, null, null, null, null), 1);

					}
				}	

				//--------------------------------------------------
				//  gradient fill style?

				if (($f_FillStyles[$counter]["Type"] == "l") or ($f_FillStyles[$counter]["Type"] == "r")) {

					if(!(($t_FillStyles[$counter]["Type"] == "l") or ($t_FillStyles[$counter]["Type"] == "r"))) {

						$this->FMError("EndMorphShape: -to- fill style not a gradient");
					}

					if ($f_FillStyles[$counter]["Type"] == "l") {

						if ($t_FillStyles[$counter]["Type"] != "l") {

							$this->FMError("EndMorphShape: -to- gradient not linear");
						}

						$GradType = 0x10;
					}
				
					if ($f_FillStyles[$counter]["Type"] == "r") {

						if ($t_FillStyles[$counter]["Type"] != "r") {

							$this->FMError("EndMorphShape: -to- gradient not radial");
						}

						$GradType = 0x12;
					}
			
					$limitg = sizeof($f_FillStyles[$counter]["Definition"]);
	
					for ($counterg = 0; $counterg <= $limitg; $counterg++) {

						$GradientRecord = $f_FillStyles[$counter]["Definition"][$counterg];

						$Ratio = $GradientRecord["Ratio"];
						$R = $GradientRecord["R"];
						$G = $GradientRecord["G"];
						$B = $GradientRecord["B"];

						if (array_key_exists("A", $GradientRecord)) {

							$A = $GradientRecord["A"];

						} else {

							$A = 255;
						}

						$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
						
					}

					$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

					$Fills .= $this->packFILLSTYLE($GradType, null, null, null, $AlphaFlag, null, $f_FillStyles[$counter]["Matrix"], $Gradient, null, null);

					for ($counterg = 0; $counterg <= $limitg; $counterg++) {

						$GradientRecord = $t_FillStyles[$counter]["Definition"][$counterg];

						$Ratio = $GradientRecord["Ratio"];
						$R = $GradientRecord["R"];
						$G = $GradientRecord["G"];
						$B = $GradientRecord["B"];

						if (array_key_exists("A", $GradientRecord)) {

							$A = $GradientRecord["A"];

						} else {

							$A = 255;
						}

						$Gradient .= $this->packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A);
						
					}

					$Gradient = $this->packGRADIENT($Gradient, $AlphaFlag);

					$Fills .= substr($this->packFILLSTYLE($GradType, null, null, null, $AlphaFlag, null, $t_FillStyles[$counter]["Matrix"], $Gradient, null, null), 1);
				}	

				//--------------------------------------------------
				//  bitmap fill style?

				if (($f_FillStyles[$counter]["Type"] == "c") or ($f_FillStyles[$counter]["Type"] == "t")) {

					if (!(($t_FillStyles[$counter]["Type"] == "c") or ($t_FillStyles[$counter]["Type"] == "t"))) {

						$this->FMError("EndMorphShape: -to- fill style not a bitmap");
					}

					if ($f_FillStyles[$counter]["Type"] == "c") {

						if ($t_FillStyles[$counter]["Type"] != "c") {

							$this->FMError("EndMorphShape: -to- bitmap not clipped");
						}

						$BType = 0x41;
					}

					if ($f_FillStyles[$counter]["Type"] == "t") {

						if ($t_FillStyles[$counter]["Type"] != "t") {

							$this->FMError("EndMorphShape: -to- bitmap not tiled");
						}

						$BType = 0x40;
					}

					$Fills .= $this->packFILLSTYLE($BType, null, null, null, $AlphaFlag, null, null, null, $f_FillStyles[$counter]["Definition"]["ID"], $f_FillStyles[$counter]["Matrix"]);
					$Fills .= substr($this->packFILLSTYLE($BType, null, null, null, $AlphaFlag, null, null, null, $t_FillStyles[$counter]["Definition"]["ID"], $t_FillStyles[$counter]["Matrix"]), 2);
				}	
			}
		}

		$FillStyleArray = $this->packFILLSTYLEARRAY($f_limitf, $Fills); 

		//--------------------------------------------------
		//  pack line styles.

		$f_Width_max = 0;
		$t_Width_max = 0;

		if ($f_limitl > 0) {

			for ($counter = 0; $counter < $f_limitl; $counter++) {


				if ((array_key_exists("A", $f_LineStyles[$counter]["Definition"])) or (array_key_exists("A", $t_LineStyles[$counter]["Definition"]))) {

					$f_tmpLines = $this->packLINESTYLE($f_LineStyles[$counter]["Definition"]["Width"], $f_LineStyles[$counter]["Definition"]["R"], $f_LineStyles[$counter]["Definition"]["G"], $f_LineStyles[$counter]["Definition"]["B"], $AlphaFlag, $f_LineStyles[$counter]["Definition"]["A"]);

					$t_tmpLines = $this->packLINESTYLE($t_LineStyles[$counter]["Definition"]["Width"], $t_LineStyles[$counter]["Definition"]["R"], $t_LineStyles[$counter]["Definition"]["G"], $t_LineStyles[$counter]["Definition"]["B"], $AlphaFlag, 255);

					$Lines .= substr($f_tmpLines, 0, 2) . substr($t_tmpLines, 0, 2) . substr($f_tmpLines, 2) . substr($t_tmpLines, 2); 

				} else {

					$f_tmpLines = $this->packLINESTYLE($f_LineStyles[$counter]["Definition"]["Width"], $f_LineStyles[$counter]["Definition"]["R"], $f_LineStyles[$counter]["Definition"]["G"], $f_LineStyles[$counter]["Definition"]["B"], $AlphaFlag, $f_LineStyles[$counter]["Definition"]["A"]);

					$t_tmpLines = $this->packLINESTYLE($t_LineStyles[$counter]["Definition"]["Width"], $t_LineStyles[$counter]["Definition"]["R"], $t_LineStyles[$counter]["Definition"]["G"], $t_LineStyles[$counter]["Definition"]["B"], $AlphaFlag, 255);

					$Lines .= substr($f_tmpLines, 0, 2) . substr($t_tmpLines, 0, 2) . substr($f_tmpLines, 2) . substr($t_tmpLines, 2); 

				}

				if ($f_Width_max < $f_LineStyles[$counter]["Definition"]["Width"]) {

					$f_Width_max = $f_LineStyles[$counter]["Definition"]["Width"];
				}

				if ($t_Width_max < $t_LineStyles[$counter]["Definition"]["Width"]) {

					$t_Width_max = $t_LineStyles[$counter]["Definition"]["Width"];
				}
			}
		}

		$LineStyleArray = $this->packLINESTYLEARRAY($f_limitl, $Lines);

		//--------------------------------------------------
		//  pack -from- shape records.

		$StateFillStyle0 = false;
		$StateStyle1 = false;
		$StateLineStyle = false;

		$FillStyle0 = 0;
		$FillStyle1 = 0;
		$LineStyle = 0;

		$X_min = 2147483647;
		$X_max = -2147483647;
		$Y_min = 2147483647;
		$Y_max = -2147483647;

		$X_tmp = 0;
		$Y_tmp = 0;

		reset($this->Shapes[$FromCharacterID]);

		foreach($this->Shapes[$FromCharacterID] as $Record) {

			if ($Record["Record"] == "moveto") {

				$MoveToX = $Record["X"];
				$MoveToY = $this->FrameSize["Ymax"] - $Record["Y"];

				$X_tmp = $MoveToX;
				$Y_tmp = $MoveToY;

				if ($MoveToX < $X_min) {

					$X_min = $MoveToX;
					$X_tmp = $MoveToX;
				}

				if ($MoveToX > $X_max) {

					$X_max = $MoveToX;
					$X_tmp = $MoveToX;
				}

				if ($MoveToY < $Y_min) {

					$Y_min = $MoveToY;
					$Y_tmp = $MoveToY;
				}

				if ($MoveToY > $Y_max) {

					$Y_max = $MoveToY;
					$Y_tmp = $MoveToY;
				}

				$StateMoveTo = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill0")) {

				$FillStyle0 = (int) $Record["StyleID"];
#error_log("FillStyle0: $FillStyle0");
				$StateFillStyle0 = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "fill1")) {

				$FillStyle1 = (int) $Record["StyleID"];
#error_log("FillStyle1: $FillStyle1");

				$StateFillStyle1 = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "changestyle") and ($Record["Style"] == "line")) {

				$LineStyle = (int) $Record["StyleID"];

				$StateLineStyle = true;
				$ChangeStyleFlag = true;

				continue;
			}

			if (($Record["Record"] == "edge") and ($Record["Type"] == "lineto")) {

				if ($ChangeStyleFlag) {
#error_log("f_limitf: $f_limitf");
#error_log("f_limitl: $f_limitl");
					if ($f_limitf > 0) {

						$nFillBits = ceil(log($f_limitf + 1) / log(2));

					} elseif ($f_limitf == 0) {

						$nFillBits = 1;
					}

					if ($f_limitl > 0) {

						$nLineBits = ceil(log($f_limitl + 1) / log(2));

					} elseif ($f_limitl == 0) {

						$nLineBits = 1;
					}
#error_log("nFillBits: $nFillBits");
#error_log("nLineBits: $nLineBits");
					$StyleChangeRecord = $this->packSTYLECHANGERECORD(false, $StateLineStyle, $StateFillStyle1, $StateFillStyle0, $StateMoveTo, $MoveToX, $MoveToY, $nFillBits, $nLineBits, $FillStyle0, $FillStyle1, $LineStyle, null, null, null, null);

					$f_Shape .= $StyleChangeRecord["Bitstream"];		

					$StateMoveTo = false;
					$StateFillStyle0 = false;
					$StateFillStyle1 = false;
					$StateLineStyle = false;
					$ChangeStyleFlag = false;
				}

				if ($Record["AnchorX"] == 0) {

					$f_Shape .= $this->packSTRAIGHTEDGERECORD(0, 1, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				if ($Record["AnchorY"] == 0) {

					$f_Shape .= $this->packSTRAIGHTEDGERECORD(0, 0, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				if (($Record["AnchorX"] != 0) and ($Record["AnchorY"] != 0)) {

					$f_Shape .= $this->packSTRAIGHTEDGERECORD(1, 0, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				$X_tmp += $Record["AnchorX"]; 
				$Y_tmp -= $Record["AnchorY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				continue;
			}

			if (($Record["Record"] == "edge") and ($Record["Type"] == "curveto")) {

				if ($ChangeStyleFlag) {

					if ($f_limitf > 1) {

						$nFillBits = ceil(log($f_limitf) / log(2));

					} elseif ($f_limitf == 1) {

						$nFillBits = 1;

					} elseif ($f_limitf == 0) {

						$nFillBits = 0;
					}

					if ($f_limitl > 1) {

						$nLineBits = ceil(log($f_limitl) / log(2));

					} elseif ($f_limitl == 1) {

						$nLineBits = 1;

					} elseif ($f_limitf == 0) {

						$nFillBits = 0;
					}

					$StyleChangeRecord = $this->packSTYLECHANGERECORD(false, $StateLineStyle, $StateFillStyle1, $StateFillStyle0, $StateMoveTo, $MoveToX, $MoveToY, $nFillBits, $nLineBits, $FillStyle0, $FillStyle1, $LineStyle, null, null, null, null);

					$f_Shape .= $StyleChangeRecord["Bitstream"];		

					$StateMoveTo = false;
					$StateFillStyle0 = false;
					$StateFillStyle1 = false;
					$StateLineStyle = false;
					$ChangeStyleFlag = false;
				}

				$f_Shape .= $this->packCURVEDEDGERECORD($Record["ControlX"], -$Record["ControlY"], $Record["AnchorX"], -$Record["AnchorY"]);

				$X_tmp += $Record["AnchorX"]; 
				$Y_tmp += $Record["AnchorY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				$X_tmp += $Record["ControlX"]; 
				$Y_tmp += $Record["ControlY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				continue;
			}
		}

		$f_Shape .= $this->packENDSHAPERECORD();

		$f_Shape = $this->packBitValues($f_Shape);

		if ($f_limitf > 0) {

			$nFillBits = ceil(log($f_limitf + 1) / log(2));

		} elseif ($f_limitf == 0) {

			$nFillBits = 0;
		}

		if ($f_limitl > 0) {

			$nLineBits = ceil(log($f_limitl + 1) / log(2));

		} elseif ($f_limitl == 0) {

			$nLineBits = 0;
		}

		$f_Shape = $this->packSHAPE($nFillBits, $nLineBits, $f_Shape);

		$f_X_min = $X_min - round($f_Width_max / 2);
		$f_X_max = $X_max + round($f_Width_max / 2);
		$f_Y_min = $Y_min - round($f_Width_max / 2);
		$f_Y_max = $Y_max + round($f_Width_max / 2);

		//--------------------------------------------------
		//  pack -to- shape records.

		$StateFillStyle0 = false;
		$StateStyle1 = false;
		$StateLineStyle = false;

		$FillStyle0 = 0;
		$FillStyle1 = 0;
		$LineStyle = 0;

		$X_min = 2147483647;
		$X_max = -2147483647;
		$Y_min = 2147483647;
		$Y_max = -2147483647;

		$X_tmp = 0;
		$Y_tmp = 0;

		reset($this->Shapes[$ToCharacterID]);

		foreach($this->Shapes[$ToCharacterID] as $Record) {

			if ($Record["Record"] == "moveto") {

				$MoveToX = $Record["X"];
				$MoveToY = $this->FrameSize["Ymax"] - $Record["Y"];

				$X_tmp = $MoveToX;
				$Y_tmp = $MoveToY;

				if ($MoveToX < $X_min) {

					$X_min = $MoveToX;
					$X_tmp = $MoveToX;
				}

				if ($MoveToX > $X_max) {

					$X_max = $MoveToX;
					$X_tmp = $MoveToX;
				}

				if ($MoveToY < $Y_min) {

					$Y_min = $MoveToY;
					$Y_tmp = $MoveToY;
				}

				if ($MoveToY > $Y_max) {

					$Y_max = $MoveToY;
					$Y_tmp = $MoveToY;
				}

				$StateMoveTo = true;
				$ChangeStyleFlag = false;

				continue;
			}

			if (($Record["Record"] == "edge") and ($Record["Type"] == "lineto")) {

				if ($StateMoveTo) {

					$StyleChangeRecord = $this->packSTYLECHANGERECORD(false, false, false, false, $StateMoveTo, $MoveToX, $MoveToY, null, null, null, null, null, null, null, null, null);
					$t_Shape .= $StyleChangeRecord["Bitstream"];		

					$StateMoveTo = false;
				}

				if ($Record["AnchorX"] == 0) {

					$t_Shape .= $this->packSTRAIGHTEDGERECORD(0, 1, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				if ($Record["AnchorY"] == 0) {

					$t_Shape .= $this->packSTRAIGHTEDGERECORD(0, 0, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				if (($Record["AnchorX"] != 0) and ($Record["AnchorY"] != 0)) {

					$t_Shape .= $this->packSTRAIGHTEDGERECORD(1, 0, $Record["AnchorX"], -$Record["AnchorY"]);
				}

				$X_tmp += $Record["AnchorX"]; 
				$Y_tmp -= $Record["AnchorY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				continue;
			}

			if (($Record["Record"] == "edge") and ($Record["Type"] == "curveto")) {

				if ($StateMoveTo) {

					$StyleChangeRecord = $this->packSTYLECHANGERECORD(false, false, false, false, $StateMoveTo, $MoveToX, $MoveToY, null, null, null, null, null, null, null, null, null);
					$t_Shape .= $StyleChangeRecord["Bitstream"];		

					$StateMoveTo = false;
				}

				$t_Shape .= $this->packCURVEDEDGERECORD($Record["ControlX"], -$Record["ControlY"], $Record["AnchorX"], -$Record["AnchorY"]);

				$X_tmp += $Record["AnchorX"]; 
				$Y_tmp += $Record["AnchorY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				$X_tmp += $Record["ControlX"]; 
				$Y_tmp += $Record["ControlY"]; 

				if ($X_tmp < $X_min) {

					$X_min = $X_tmp;
				}

				if ($X_tmp > $X_max) {

					$X_max = $X_tmp;
				}

				if ($Y_tmp < $Y_min) {

					$Y_min = $Y_tmp;
				}

				if ($Y_tmp > $Y_max) {

					$Y_max = $Y_tmp;
				}

				continue;
			}
		}

		$t_Shape .= $this->packENDSHAPERECORD();

		$t_Shape = $this->packBitValues($t_Shape);

		if ($t_limitf > 0) {

			$nFillBits = ceil(log($t_limitf + 1) / log(2));

		} elseif ($t_limitf == 0) {

			$nFillBits = 0;
		}

		if ($t_limitl > 0) {

			$nLineBits = ceil(log($t_limitl + 1) / log(2));

		} elseif ($t_limitl == 0) {

			$nLineBits = 0;
		}

		$t_Shape = $this->packSHAPE($nFillBits, $nLineBits, $t_Shape);

		$t_X_min = $X_min - round($t_Width_max / 2);
		$t_X_max = $X_max + round($t_Width_max / 2);
		$t_Y_min = $Y_min - round($t_Width_max / 2);
		$t_Y_max = $Y_max + round($t_Width_max / 2);

		$this->packDefineMorphShapeTag($FromCharacterID, $this->packRECT($f_X_min, $f_X_max, $f_Y_min, $f_Y_max), $this->packRECT($t_X_min, $t_X_max, $t_Y_min, $t_Y_max), $FillStyleArray, $LineStyleArray, $f_Shape, $t_Shape);

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $FromCharacterID, "f_X_min" => $f_X_min, "f_X_max" => $f_X_max, "f_Y_min" => $f_Y_min, "f_Y_max" => $f_Y_max, "t_X_min" => $t_X_min, "t_X_max" => $t_X_max, "t_Y_min" => $t_Y_min, "t_Y_max" => $t_Y_max );

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}


	//--------------------------------------------------
	//  Line Styles
	//--------------------------------------------------

	//--------------------------------------------------
	// integer DashedLine(integer LineLength, 
	//     integer SpaceLength, integer X1, integer Y1,
	//           integer X2, integer Y2, integer Width, 
	//                array LineStyle, array FillStyle, 
	//               string FillType, string FillMatrix)
	// cretes a dashed line with flat ends.


	function DashedLine($LineLength, $SpaceLength, $X1, $Y1, $X2, $Y2, $Width, $LineStyle, $FillStyle, $FillType, $FillMatrix)
	{
		//--------------------------------------------------
		//  push the name of this function onto the debug 
		//  stack.

		array_push($this->FMDebug, "DashedLine");

		$CharacterID = $this->BeginShape();

		$this->SelectLineStyle($CharacterID, $LineStyle);
		$this->SelectFill1Style($CharacterID, $FillStyle, $FillType, $FillMatrix);

		$totallength = sqrt(pow($X2 - $X1, 2) + pow($Y2 - $Y1, 2));
		$tmplength = $totallength;

		$line = true;
		$store = array();

		while (true) {

			if ($line) {

				if ($tmplength >= $LineLength) {

					$store[] = $LineLength;
					$tmplength -= $LineLength;
					$line = false;

				} else {

					$store[] = round($tmplength);
					break;
				}

			} else {

				if ($tmplength >= $SpaceLength) {

					$store[] = $SpaceLength;
					$tmplength -= $SpaceLength;
					$line = true;

				} else {

					$store[] = round($tmplength);
					break;
				}
			}
		}

		$Alpha = asin(($Y2 - $Y1) / $totallength);
		$Width2 = $Width / 2;

		$XF = $X1;
		$YF = $Y1;

		$line = true;

		$limit = sizeof($store);

		for ($counter = 0; $counter < $limit; $counter++) {
	
			$XDA = $Width * sin($Alpha);
			$YDA = $Width * cos($Alpha);
			$XDB = $store[$counter] * cos($Alpha);
			$YDB = $store[$counter] * sin($Alpha);

			if ($line) {

				$this->MoveTo($CharacterID, $XF + 0.5 * $XDA, $YF - 0.5 * $YDA);
				$this->LineTo($CharacterID, -$XDA, $YDA);
				$this->LineTo($CharacterID, $XDB, $YDB);
				$this->LineTo($CharacterID, $XDA, -$YDA);
				$this->LineTo($CharacterID, -$XDB, -$YDB);

				$line = false;

			} else {

				$line = true;
			}
 
			$XF += $XDB;
			$YF += $YDB;
		}

		$this->EndShape($CharacterID);

		//--------------------------------------------------
		//  create the CharacterInfo array for this shape.

		$CharacterInfo = array("CharacterID" => $CharacterID, "X_min" => $X_min, "X_max" => $X_max, "Y_min" => $Y_min, "Y_max" => $Y_max);

		//--------------------------------------------------
		//  pop the name of this function off the debug 
		//  stack.

		array_pop($this->FMDebug);

		//--------------------------------------------------
		//  return the CharacterInfo array for this shape.

		return $CharacterInfo;
	}

}
?>
