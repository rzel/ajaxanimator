<?php

//---------------------------------------------------------------
//  file flashmoviecompiler.php

//---------------------------------------------------------------
//  FreeMovieCompiler -- Macromedia Flash (SWF) file generator
//
//  Copyright (C) 2001, 2002 Jacek Artymiak 
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
//  Class FreeMovieCompiler defines an SWF file object.  Its 
//  methods and properties are used to create a Flash movie.

class FreeMovieCompiler
{
  var $Cal_mode = true;

	var $SWFVersion = 0;	// use SetSWFVersion to
				// change it or GetSWFVersion to
				// read it

	var $SWFVersionLowerLimit = 1;
	var $SWFVersionUpperLimit = 6;

	var $FrameSize = array("Xmin" => 0, "Xmax" => 11000, "Ymin" => 0, "Ymax" => 8000);
	var $FrameRate = 12.5;
	var $BackgroundColor = array("R" => 0, "G" => 0, "B" => 0);

	var $MovieData = "";

	var $FrameCounter = 0;
	var $CharacterDepth = 0;

	var $Bitmaps = array();

	var $FMDebug = array();

	//-------------------------------------------------------
	// the theoretical limit is 65535, but older versions of
	// Flash Player cannot display layers above 16000.
 
	#var $LayerLimit = 65535;
	var $LayerLimit = 16000;

	//-------------------------------------------------------
	// the theoretical limit is 65535, but older versions of
	// Flash Player cannot display frames beyond 16000.
 
	#var $FrameNumberLimit = 65535;
	var $FrameNumberLimit = 16000;

	var $CharacterIDLimit = 65535;
	var $CharacterID = 0;

	//-------------------------------------------------------
	//  string FMError(string message)
	//  displays error messages.

	function FMError($message)
	{
		$trace = "";

		foreach ($this->FMDebug as $level) {
			$trace .= " > " . $level;
		}

		error_log ("freemoviecompiler error: $trace --> $message");

		exit;
	}

	//-------------------------------------------------------
	//  string FMWarning(string message)
	//  displays warnings messages.

	function FMWarning($message)
	{
		$trace = "";

		foreach ($this->FMDebug as $level) {
			$trace .= " > " . $level;
		}

		error_log ("freemoviecompiler warning: $trace --> $message");
	}

	//------------------------------------------------//
	//                                                //
	//                 Basic types                    //
	//                                                //
	//------------------------------------------------//

	//-------------------------------------------------------
   	//  string packUI8(integer number)
	//  converts the given 8-bit unsigned integer number into
	//  an SWF UI8 atom.

	function packUI8($number)
	{
		array_push($this->FMDebug, "packUI8");

		if (!(is_numeric($number))) {

			$this->FMError("packUI8 argument $number not a number");
		}

		$number = (int) $number;

		$lower_limit = 0;
		$upper_limit = 255;

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		$atom = chr($number);

		array_pop($this->FMDebug);

		return $atom;
	}

	//-------------------------------------------------------
   	//  string packUI16(integer number)
	//  converts the given 16-bit unsigned integer into an
	//  SWF UI16 atom.

	function packUI16($number)
	{
		array_push($this->FMDebug, "packUI16");

        	if (!(is_numeric($number))) {

                	$this->FMError("packUI16 argument not a number");
        	}

		$number = (int) $number;

		$lower_limit = 0;
		$upper_limit = 65535;

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		$number = sprintf("%04x", $number);

		$low_byte  = base_convert(substr($number, 2, 2), 16, 10);
		$high_byte = base_convert(substr($number, 0, 2), 16, 10);

		$atom  = chr($low_byte) . chr($high_byte);

		array_pop($this->FMDebug);

        	return $atom;
	}

	//-------------------------------------------------------
   	//  string packUI32(integer number)
	//  converts the given unsigned integer into an SWF 
	//  UI32 atom and returns it.

	function packUI32($number)
	{	
		array_push($this->FMDebug, "packUI32");

	        if (!(is_integer($number))) {

        	        $this->FMError("packUI32 argument not an integer");
        	}

		$lower_limit = 0;
		$upper_limit = 2147483647;  	# the real limit is 4294967295
						# but PHP 4 cannot handle such
						# large unsigned integers 

	        if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
        	}

		$number = sprintf("%08x", $number);

		$low_byte_low_word  = base_convert(substr($number, 6, 2), 16, 10);
		$high_byte_low_word = base_convert(substr($number, 4, 2), 16, 10); 

		$low_byte_high_word  = base_convert(substr($number, 2, 2), 16, 10);
		$high_byte_high_word = base_convert(substr($number, 0, 2), 16, 10);

		$atom  = chr($low_byte_low_word)  . chr($high_byte_low_word);
		$atom .= chr($low_byte_high_word) . chr($high_byte_high_word);

		array_pop($this->FMDebug);

        	return $atom;
	}

	//-------------------------------------------------------
   	//  string packSI8(integer number)
	//  converts the given 8-bit signed integer into an SWF 
	//  SI8 atom.

	function packSI8($number)
	{
		array_push($this->FMDebug, "packSI8");

		if (!(is_numeric($number))) {

			$this->FMError("packSI8 argument not a number");
		}

		$number = (int) $number;

		$lower_limit = -127;
		$upper_limit = 127;

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		if ($number < 0) {

			$number = $upper_limit + 1 + abs($number);
		}

		$atom = chr($number);

		array_pop($this->FMDebug);

		return $atom;
	}

	//-------------------------------------------------------
   	//  string packSI16(integer number)
	//  converts the given 16-bit signed integer into an SWF 
	//  SI16 atom.

	function packSI16($number)
	{
		array_push($this->FMDebug, "packSI16");

		if (!(is_numeric($number))) {

			$this->FMError("packSI16 argument not a number");
		}

		$number = (int) $number;

		$lower_limit = -32767;
		$upper_limit = 32767;

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		if ($number < 0 ) {

			$number = $upper_limit + 1 + abs($number);
		}

		$number = sprintf("%04x", $number);

		$low_byte  = base_convert(substr($number, 2, 2), 16, 10);
		$high_byte = base_convert(substr($number, 0, 2), 16, 10);

		$atom  = chr($low_byte) . chr($high_byte);

		array_pop($this->FMDebug);

        	return $atom;
	}

	//-------------------------------------------------------
   	//  string packSI32(integer number)
	//  converts the given 32-bit signed integer into an SWF 
	//  SI32 atom.

	function packSI32($number)
	{	
		array_push($this->FMDebug, "packSI32");

	        if (!(is_numeric($number))) {

        	        $this->FMError("packUI32 argument not a number");
        	}
		$lower_limit = -2147483647;
		$upper_limit = 2147483647;

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		if ($number < 0) {

			$number = $upper_limit + 1 + abs($number);
		}

		$number = sprintf("%08x", $number);

		$low_byte_low_word  = base_convert(substr($number, 6, 2), 16, 10);
		$high_byte_low_word = base_convert(substr($number, 4, 2), 16, 10); 

		$low_byte_high_word  = base_convert(substr($number, 2, 2), 16, 10);
		$high_byte_high_word = base_convert(substr($number, 0, 2), 16, 10);

		$atom  = chr($low_byte_low_word)  . chr($high_byte_low_word);
		$atom .= chr($low_byte_high_word) . chr($high_byte_high_word);

		array_pop($this->FMDebug);

        	return $atom;
	}

	//-------------------------------------------------------
   	//  string packFIXED8(float number)
	//  converts the given signed floating-point number into
	//  an SWF FIXED 8.8 atom.

	function packFIXED8($number)
	{
		array_push($this->FMDebug, "packFIXED8");

		$lower_limit_high_byte = -127;
		$upper_limit_high_byte = 127;
		$lower_limit_low_byte = 0;
		$upper_limit_low_byte = 99;

	        if (!(is_numeric($number))) {

        	        $this->FMError("packFIXED8 argument not a number");
        	}

		$number = round($number, 2);

		$high_byte = intval($number);

		if ($high_byte < $lower_limit_high_byte) {

			$high_byte = $lower_limit_high_byte;
		}

		if ($high_byte > $upper_limit_high_byte) {

			$high_byte = $upper_limit_high_byte;
		}

		$low_byte = (int) ((abs($number) - intval(abs($number))) * 100);

		$atom  = $this->packUI8(intval($low_byte * 256 / 100));
		$atom .= $this->packSI8($high_byte);

		array_pop($this->FMDebug);

		return $atom;
	}

	//-------------------------------------------------------
   	//  string packFIXED16(float number)
	//  converts the given signed floating-point number into
	//  an SWF FIXED 16.16 atom.

	function packFIXED16($number)
	{
		array_push($this->FMDebug, "packFIXED16");

		$lower_limit_high_word = -32767;
		$upper_limit_high_word = 32767;
		$lower_limit_low_word = 0;
		$upper_limit_low_word = 9999;

	        if (!(is_numeric($number))) {

        	        $this->FMError("packFIXED16 argument not a number");
        	}

		$number = round($number, 4);

		$high_word = intval($number);

		if ($high_word < $lower_limit_high_word) {

			$high_word = $lower_limit_high_word;
		}

		if ($high_word > $upper_limit_high_word) {

			$high_word = $upper_limit_high_word;
		}

		$low_word = (int) ((abs($number) - intval(abs($number))) * 10000);

		$atom  = $this->packUI16(intval($low_word * 65536 / 10000));
		$atom .= $this->packSI16($high_word);

		array_pop($this->FMDebug);

		return $atom;
	}

	//-------------------------------------------------------
	//  string packUBchunk(integer number)
	//  converts the given 31-bit unsigned integer number into 
	//  an SWF UB atom.

	function packUBchunk($number)
	{
		array_push($this->FMDebug, "packUBchunk");

		$lower_limit = 0;
		$upper_limit = 2147483647;

		if (!(is_numeric($number))) {

			$this->FMError("packUBchunk argument not a number");
		}

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		$atom = sprintf("%b", $number);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packSBchunk(integer number)
	//  converts the given 31-bit signed integer number 
	//  into an SWF SB atom.

	function packSBchunk($number)
	{
		array_push($this->FMDebug, "packSBchunk");

		if (!(is_numeric($number))) {

			$this->FMError("packSBchunk argument not a number");
		}

		$number = (int) $number;

		$lower_limit = -1073741823;
		$upper_limit = 1073741823;

		if ($number < $lower_limit) {

			$number = $lower_limit;
		}

		if ($number > $upper_limit) {

			$number = $upper_limit;
		}

		if ($number < 0) {

			if ($number == -1) {

				$atom = "11";

			} else {

				$atom = decbin($number);
				$atom = substr($atom, strpos($atom, "10"));
			}

		} else {

			$atom = "0" . decbin($number);
		}

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packFBchunk(float number)
	//  converts the given signed floating-point number 
	//  into an SWF FB atom.

	function packFBchunk($number)
	{
		array_push($this->FMDebug, "packFBchunk");

		$lower_limit_high_word = -16383;
		$upper_limit_high_word = 16383;
		$lower_limit_low_word = 0;
		$upper_limit_low_word = 9999;

	        if (!(is_numeric($number))) {

        	        $this->FMError("packFBchunk argument not a number");
        	}

		$number = round($number, 4);

		$high_word = intval($number);
		$low_word = (int) ((abs($number) - intval(abs($number))) * 10000);

		if ($high_word < $lower_limit_high_word) {

			$high_word = $lower_limit_high_word;
		}

		if ($high_word > $upper_limit_high_word) {

			$high_word = $upper_limit_high_word;
		}

		if ($low_word < $lower_limit_low_word) {

			$low_word = $lower_limit_low_word;
		}

		if ($low_word > $upper_limit_low_word) {

			$low_word = $upper_limit_low_word;
		}

		if ($number < 0) {

			if ($high_word == 0) {

				$high_word = "1";

			} else {

				$high_word = "1" . substr(decbin($high_word), 18);
			}

		} else {

			if ($high_word == 0) {

				$high_word = "0";

			} else {

				$high_word = "0" . decbin($high_word);
			}
		}

		if ($number < 0) {

			if ($low_word == 0) {

				$low_word = "0000000000000000";

			} else {

				$low_word = ~$low_word;

				$low_word = substr(decbin(intval($low_word * 65536 / 10000)), 16);

			}

		} else {

			if ($low_word == 0) {

				$low_word = "0000000000000000";

			} else {

				$low_word = sprintf("%016s", decbin(intval($low_word * 65536 / 10000)));

			}

		}

		$atom = $high_word . $low_word;

		array_pop($this->FMDebug);

		return $atom;
	}

	//-------------------------------------------------------
	//  string packnBits(integer number, integer n)
	//  converts the given unsigned integer number (the 
	//  length of the largest bit field) into an SWF n bits 
	//  long nBits atom. 

	function packnBits($number, $n)
	{
		array_push($this->FMDebug, "packnBits");

	        if (!(is_numeric($number))) {
#error_log("nBits number: $number");
        	        $this->FMError("packnBits argument (number) not a number");
        	}

		$number = (int) $number;

		$lower_limit = 0;
		$upper_limit = 32;

	        if (($number < $lower_limit) or ($number > $upper_limit)) {

        	        $this->FMError("packnBits argument (number) out of range");
        	}

	        if (!(is_numeric($n))) {

        	        $this->FMError("packnBits argument (n) not a number");
        	}

	        if ($n < $lower_limit) {

        	        $this->FMError("packnBits argument (n) out of range");
        	}

		$n = (int) $n;

		if ($number > (pow(2, $n) - 1)) {

			$this->FMError("packnBits cannot pack ($number) in ($n) bits");
		}

		$atom = sprintf("%b", $number);
		$atom = str_repeat("0", ($n - strlen($atom))) . $atom;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packBitValues(string atoms)
	//  converts the given string of SWF bit values 
	//  (atoms) into a byte-aligned stream. 

	function packBitValues($atoms)
	{
		array_push($this->FMDebug, "packBitsValues");

		if (!(is_string($atoms))) {

			$this->FMError("packBitValues argument not a string");
		}

		$atoms = $atoms . str_repeat("0", (int) ((ceil(strlen($atoms) / 8)) * 8 - strlen($atoms)));

		$limit = ceil(strlen($atoms) / 8);

		$bytestream = "";

		for ($n = 0; $n < $limit; $n++) {

			$bytestream .= chr(base_convert(substr($atoms, 0, 8), 2, 10));
			$atoms = substr($atoms, 8);
		}

		array_pop($this->FMDebug);

		return $bytestream;
	}

	//--------------------------------------------------
	//  string packSTRING(string text)
	//  converts the given text string into an SWF 
	//  STRING atom. 

	function packSTRING($text)
	{
		array_push($this->FMDebug, "packSTRING");

		if (!(is_string($text))) {

			$this->FMError("packSTRING argument not a string");
		}

		$atom = strtr($text, chr(0), "") . chr(0);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packRECT(integer Xmin, integer Xmax,
	//                       integer Ymin, integer Ymax)
	//  returns an SWF RECT bit value (atom) string.

	function packRECT($Xmin, $Xmax, $Ymin, $Ymax)
	{
		array_push($this->FMDebug, "packRECT");

		if (!(($Xmin == 0) and ($Xmax == 0) and ($Ymin == 0) and ($Ymax == 0))) {
			$Xmin = $this->packSBchunk($Xmin); 
			$Xmax = $this->packSBchunk($Xmax); 
			$Ymin = $this->packSBchunk($Ymin); 
			$Ymax = $this->packSBchunk($Ymax);

			$nBits = (int) max(strlen($Xmin), strlen($Xmax), strlen($Ymin), strlen($Ymax));

			$Xmin = str_repeat(substr($Xmin, 0, 1), $nBits - strlen($Xmin)) . $Xmin;
			$Xmax = str_repeat(substr($Xmax, 0, 1), $nBits - strlen($Xmax)) . $Xmax;
			$Ymin = str_repeat(substr($Ymin, 0, 1), $nBits - strlen($Ymin)) . $Ymin;
			$Ymax = str_repeat(substr($Ymax, 0, 1), $nBits - strlen($Ymax)) . $Ymax;

			$atom = $this->packnBits($nBits, 5) . $Xmin . $Xmax . $Ymin . $Ymax;
		} else {

			$atom = "00000";
		}

		$atom = $this->packBitValues($atom);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packRGB(integer R, integer G, integer B)
	//  returns an SWF RGB atom string.

	function packRGB($R, $G, $B)
	{
		array_push($this->FMDebug, "packRGB");

		$atom  = $this->packUI8($R);
		$atom .= $this->packUI8($G);
		$atom .= $this->packUI8($B);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packRGBA(integer R, integer G, 
	//                             integer B, integer A)
	//  returns an SWF RGBA atom string.

	function packRGBA($R, $G, $B, $A)
	{
		array_push($this->FMDebug, "packRGBA");

		$atom  = $this->packUI8($R);
		$atom .= $this->packUI8($G);
		$atom .= $this->packUI8($B);
		$atom .= $this->packUI8($A);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packMATRIX(boolean HasScale, 
	//    float ScaleX, float ScaleY,boolean HasRotate, 
	//            float RotateSkew0, float RotateSkew1,
	//           integer TranslateX, integer TranslateY) 
	//  returns an SWF MATRIX atom string.

	function packMATRIX($HasScale, $ScaleX, $ScaleY, $HasRotate, $RotateSkew0, $RotateSkew1, $TranslateX, $TranslateY)
	{
		array_push($this->FMDebug, "packMATRIX");

		$atom = "";

		if ($HasScale) {

			$ScaleX = $this->packFBchunk($ScaleX);
			$ScaleY = $this->packFBchunk($ScaleY);

			$nScaleBits = (int) max(strlen($ScaleX), strlen($ScaleY));
			#$nScaleBits = 31; 

			$ScaleX = str_repeat(substr($ScaleX, 0, 1), ($nScaleBits - strlen($ScaleX))) . $ScaleX;
			$ScaleY = str_repeat(substr($ScaleY, 0, 1), ($nScaleBits - strlen($ScaleY))) . $ScaleY;

			$atom = "1" . $this->packnBits($nScaleBits, 5) . $ScaleX . $ScaleY;
		} else {

			$atom = "0";
		}

		if ($HasRotate) {

			$RotateSkew0 = $this->packFBchunk($RotateSkew0);
			$RotateSkew1 = $this->packFBchunk($RotateSkew1);

			#$nRotateBits = 31;
			$nRotateBits = (int) max(strlen($RotateSkew0), strlen($RotateSkew1));

			$RotateSkew0 = str_repeat(substr($RotateSkew0, 0, 1), $nRotateBits - strlen($RotateSkew0)) . $RotateSkew0;
			$RotateSkew1 = str_repeat(substr($RotateSkew1, 0, 1), $nRotateBits - strlen($RotateSkew1)) . $RotateSkew1;

			$atom .= "1" . $this->packnBits($nRotateBits, 5) . $RotateSkew0 . $RotateSkew1;

		} else {

			$atom .= "0";
		}

		if (($TranslateX == 0) and ($TranslateY == 0)) {

			$atom .= "00000";

		} else {

			$TranslateX = $this->packSBchunk($TranslateX); 
			$TranslateY = $this->packSBchunk($TranslateY);

			$nTranslateBits = (int) max(strlen($TranslateX), strlen($TranslateY));

			$TranslateX = str_repeat(substr($TranslateX, 0, 1), $nTranslateBits - strlen($TranslateX)) . $TranslateX;
			$TranslateY = str_repeat(substr($TranslateY, 0, 1), $nTranslateBits - strlen($TranslateY)) . $TranslateY;

			$atom .= $this->packnBits($nTranslateBits, 5) . $TranslateX . $TranslateY;
		}

		$atom  = $this->packBitValues($atom);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packCXFORM(boolean HasAddTerms, 
	//        integer RedAddTerm, integer GreenAddTerm,
	//       integer BlueAddTerm, boolean HasMultTerms, 
	//      integer RedMultTerm, integer GreenMultTerm,
	//                             integer BlueMultTerm)
	//  returns an SWF CXFORM atom string.

	function packCXFORM($HasAddTerms, $RedAddTerm, $GreenAddTerm, $BlueAddTerm, $HasMultTerms, $RedMultTerm, $GreenMultTerm, $BlueMultTerm)
	{
		array_push($this->FMDebug, "packCXFORM");

		if ($HasAddTerms) {

			$RedAddTerm = $this->packSBchunk($RedAddTerm);
			$GreenAddTerm = $this->packSBchunk($GreenAddTerm);
			$BlueAddTerm = $this->packSBchunk($BlueAddTerm);

			$atom = "1";

		} else {

			$atom = "0";
		}

		if ($HasMultTerms) {

			$RedMultTerm = $this->packSBchunk($RedMultTerm);
			$GreenMultTerm = $this->packSBchunk($GreenMultTerm);
			$BlueMultTerm = $this->packSBchunk($BlueMultTerm);

			$atom .= "1";

		} else {

			$atom .= "0";
		}

		if (!(($HasAddTerms == 0) and ($HasMultTerms == 0))) {

			$nBits = (int) max(strlen($RedMultTerm), strlen($GreenMultTerm), strlen($BlueMultTerm), strlen($RedAddTerm), strlen($GreenAddTerm), strlen($BlueAddTerm));

			$RedAddTerm = str_repeat(substr($RedAddTerm, 0, 1), $nBits - strlen($RedAddTerm)) . $RedAddTerm;
			$GreenAddTerm = str_repeat(substr($GreenAddTerm, 0, 1), $nBits - strlen($GreenAddTerm)) . $GreenAddTerm;
			$BlueAddTerm = str_repeat(substr($BlueAddTerm, 0, 1), $nBits - strlen($BlueAddTerm)) . $BlueAddTerm;

			$RedMultTerm = str_repeat(substr($RedMultTerm, 0, 1), $nBits - strlen($RedMultTerm)) . $RedMultTerm;
			$GreenMultTerm = str_repeat(substr($GreenMultTerm, 0, 1), $nBits - strlen($GreenMultTerm)) . $GreenMultTerm;
			$BlueMultTerm = str_repeat(substr($BlueMultTerm, 0, 1), $nBits - strlen($BlueMultTerm)) . $BlueMultTerm;

			$atom .= $this->packnBits($nBits, 5);

			if ($HasMultTerms) {

				$atom .= $RedMultTerm . $GreenMultTerm . $BlueMultTerm;
			}

			if ($HasAddTerms) {

				$atom .= $RedAddTerm . $GreenAddTerm . $BlueAddTerm;
			}

		}

		$atom = $this->packBitValues($atom);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packCXFORMWITHALPHA(boolean HasAddTerms, 
	//        integer RedAddTerm, integer GreenAddTerm,
	//       integer BlueAddTerm, integer AlphaAddTerm,
	//       boolean HasMultTerms, integer RedMultTerm, 
	//     integer GreenMultTerm, integer BlueMultTerm,
	//                            integer AlphaMultTerm)
	//  returns an SWF CXFORMWITHALPHA atom string.

	function packCXFORMWITHALPHA($HasAddTerms, $RedAddTerm, $GreenAddTerm, $BlueAddTerm, $AlphaAddTerm, $HasMultTerms, $RedMultTerm, $GreenMultTerm, $BlueMultTerm, $AlphaMultTerm)
	{
		array_push($this->FMDebug, "packCXFORMWITHALPHA");

		if ($HasAddTerms) {

			$RedAddTerm = $this->packSBchunk($RedAddTerm);
			$GreenAddTerm = $this->packSBchunk($GreenAddTerm);
			$BlueAddTerm = $this->packSBchunk($BlueAddTerm);
			$AlphaAddTerm = $this->packSBchunk($AlphaAddTerm);

			$atom = "1";

		} else {

			$atom = "0";
		}

		if ($HasMultTerms) {

			$RedMultTerm = $this->packSBchunk($RedMultTerm);
			$GreenMultTerm = $this->packSBchunk($GreenMultTerm);
			$BlueMultTerm = $this->packSBchunk($BlueMultTerm);
			$AlphaMultTerm = $this->packSBchunk($AlphaMultTerm);

			$atom .= "1";

		} else {

			$atom .= "0";
		}

		if (!(($HasAddTerms == 0) and ($HasMultTerms == 0))) {

			$nBits = (int) max(strlen($RedMultTerm), strlen($GreenMultTerm), strlen($BlueMultTerm), strlen($AlphaMultTerm), strlen($RedAddTerm), strlen($GreenAddTerm), strlen($BlueAddTerm), strlen($AlphaAddTerm));

			$RedAddTerm = str_repeat(substr($RedAddTerm, 0, 1), $nBits - strlen($RedAddTerm)) . $RedAddTerm;
			$GreenAddTerm = str_repeat(substr($GreenAddTerm, 0, 1), $nBits - strlen($GreenAddTerm)) . $GreenAddTerm;
			$BlueAddTerm = str_repeat(substr($BlueAddTerm, 0, 1), $nBits - strlen($BlueAddTerm)) . $BlueAddTerm;
			$AlphaAddTerm = str_repeat(substr($AlphaAddTerm, 0, 1), $nBits - strlen($AlphaAddTerm)) . $AlphaAddTerm;

			$RedMultTerm = str_repeat(substr($RedMultTerm, 0, 1), $nBits - strlen($RedMultTerm)) . $RedMultTerm;
			$GreenMultTerm = str_repeat(substr($GreenMultTerm, 0, 1), $nBits - strlen($GreenMultTerm)) . $GreenMultTerm;
			$BlueMultTerm = str_repeat(substr($BlueMultTerm, 0, 1), $nBits - strlen($BlueMultTerm)) . $BlueMultTerm;
			$AlphaMultTerm = str_repeat(substr($AlphaMultTerm, 0, 1), $nBits - strlen($AlphaMultTerm)) . $AlphaMultTerm;

			$atom .= $this->packnBits($nBits, 5);

			if ($HasMultTerms == "1") {
				$atom .= $RedMultTerm . $GreenMultTerm . $BlueMultTerm . $AlphaMultTerm;
			}

			if ($HasAddTerms == "1") {
				$atom .= $RedAddTerm . $GreenAddTerm . $BlueAddTerm . $AlphaAddTerm;
			}

		}

		$atom = $this->packBitValues($atom);

		array_pop($this->FMDebug);

		return $atom;
	}

	//------------------------------------------------//
	//                                                //
	//              Compound data types               //
	//                                                //
	//------------------------------------------------//

	//--------------------------------------------------
	//  string packZLIBBITMAPDATA(string ColorTableRGB,
	//                           string BitmapPixelData)
	//  returns an SWF ZLIBBITMAPDATA string.

	function packZLIBBITMAPDATA($ColorTableRGB, $BitmapPixelData)
	{
		array_push($this->FMDebug, "packZLIBBITMAPDATA");

		$atom = $ColorTableRGB . $BitmapPixelData;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packZLIBBITMAPDATA2(
	//    string ColorTableRGBA, string BitmapPixelData)
	//  returns an SWF ZLIBBITMAPDATA2 string.

	function packZLIBBITMAPDATA2($ColorTableRGBA, $BitmapPixelData)
	{
		array_push($this->FMDebug, "packZLIBBITMAPDATA2");

		$atom = $ColorTableRGBA . $BitmapPixelData;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packGRADRECORD(string ShapeTag, 
	//             integer Ratio, integer R, integer G,
	//                             integer B, boolean AlphaFlag, integer A)
	//  returns an SWF GRADRECORD string.

	function packGRADRECORD($Ratio, $R, $G, $B, $AlphaFlag, $A)
	{
		array_push($this->FMDebug, "packGRADRECORD");

		if ($AlphaFlag) {
			$atom = $this->packUI8((int)$Ratio) . $this->packRGBA((int)$R, (int)$G, (int)$B, (int)$A);
		} else {
			$atom = $this->packUI8((int)$Ratio) . $this->packRGB((int)$R, (int)$G, (int)$B);
		}

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packGRADIENT(string GradientRecords) 
	//  returns an SWF GRADIENT string.

	function packGRADIENT($GradientRecords, $AlphaFlag)
	{
		array_push($this->FMDebug, "packGRADIENT");

		if ($AlphaFlag) {
			$atom = $this->packUI8((int)strlen($GradientRecords) / 5) . $GradientRecords;
		} else {
			$atom  = $this->packUI8((int)strlen($GradientRecords) / 4) . $GradientRecords;
		}

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packFILLSTYLE(int FillStyleType, int R, 
	//      int G, int B, int A, string GradientMatrix,
	//               string Gradient, integer BitmapID,
	//                              string BitmapMatrix)
	//  returns an SWF FILLSTYLE string.

	function packFILLSTYLE($FillStyleType, $R, $G, $B, $AlphaFlag, $A, $GradientMatrix, $Gradient, $BitmapID, $BitmapMatrix)
	{
		array_push($this->FMDebug, "packFILLSTYLE");

		//-------------------------------------------------- .[cal]
		//  add vertical and horizontal straight edges.
		if(!isset($atom) & $this->Cal_mode){
		  $atom = "";
		}
		// [cal].


		switch ($FillStyleType) {

			case 0x00:

				if ($AlphaFlag) {

					if ($A == "") {

						$A = 0xff;
					}

					$atom .= $this->packRGBA($R, $G, $B, $A);

				} else {

					$atom .= $this->packRGB($R, $G, $B);
				}

				break;

			case 0x10:

				$atom .= $GradientMatrix . $Gradient;

				break;

			case 0x12:

				$atom .= $GradientMatrix . $Gradient;

				break;

			case 0x40:

				$atom .= $this->packUI16($BitmapID) . $BitmapMatrix;

				break;

			case 0x41:

				$atom .= $this->packUI16($BitmapID) . $BitmapMatrix;

				break;

			default:

				$this->FMError("packFILLSTYLE unknown FillStyleType value");
		}

		$atom  = $this->packUI8($FillStyleType) . $atom;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packFILLSTYLEARRAY(string ShapeTag, 
	//       integer FillStyleCount, string FillStyles)
	//  returns an SWF FILLSTYLEARRAY string.

	function packFILLSTYLEARRAY($FillStyleCount, $FillStyles)
	{
		array_push($this->FMDebug, "packFILLSTYLEARRAY");

		if ($FillStyleCount < 0xff) {

			$atom = $this->packUI8($FillStyleCount);

		} else {

			$atom = chr(0xff) . $this->packUI16($FillStyleCount);
		}

		$atom .= $FillStyles; 

		array_pop($this->FMDebug);

		return $atom;
	}
 
	//--------------------------------------------------
	//  string packLINESTYLE(integer Width, integer R,
	//                  integer G, integer B, integer A)
	//  returns an SWF LINESTYLE string.

	function packLINESTYLE($Width, $R, $G, $B, $AlphaFlag, $A)
	{
		array_push($this->FMDebug, "packLINESTYLE");

		$atom  = $this->packUI16($Width);

		if ($AlphaFlag) {

			if ($A == "") {

				$A = 0xff;
			}

			$atom  .= $this->packRGBA($R, $G, $B, $A);

		} else {

			$atom  .= $this->packRGB($R, $G, $B);
		}

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packLINESTYLEARRAY(int LineStyleCount, 
	//                                string LineStyles)
	//  returns an SWF LINESTYLEARRAY string.

	function packLINESTYLEARRAY($LineStyleCount, $LineStyles)
	{
		array_push($this->FMDebug, "packLINESTYLEARRAY");

		if ($LineStyleCount < 0xff) {

			$atom  = $this->packUI8($LineStyleCount);

		} else {

			$atom .= char(0xff) . $this->packUI16($LineStyleCount);
		}

		$atom .= $LineStyles; 

		array_pop($this->FMDebug);

		return $atom;
	}
 
	//--------------------------------------------------
	//  string packCURVEDEDGERECORD(
	//    integer ControlDeltaX, integer ControlDeltaY,
	//       integer AnchorDeltaX, integer AnchorDeltaY)
	//  returns an SWF CURVEDEDGERECORD string.

	function packCURVEDEDGERECORD($ControlDeltaX, $ControlDeltaY, $AnchorDeltaX, $AnchorDeltaY)
	{
		array_push($this->FMDebug, "packCURVEDEDGERECORD");

		$TypeFlag = "1";
		$StraightEdge = "0";

		$ControlDeltaX = $this->packSBchunk($ControlDeltaX); 
		$ControlDeltaY = $this->packSBchunk($ControlDeltaY);
		$AnchorDeltaX = $this->packSBchunk($AnchorDeltaX); 
		$AnchorDeltaY = $this->packSBchunk($AnchorDeltaY);

		$NumBits = (int) max(strlen($ControlDeltaX), strlen($ControlDeltaY), strlen($AnchorDeltaX), strlen($AnchorDeltaY));

		$nBits = $this->packnBits($NumBits - 2, 4);

		$ControlDeltaX = str_repeat(substr($ControlDeltaX, 0, 1), ($NumBits - strlen($ControlDeltaX))) . $ControlDeltaX;
		$ControlDeltaY = str_repeat(substr($ControlDeltaY, 0, 1), ($NumBits - strlen($ControlDeltaY))) . $ControlDeltaY;

		$AnchorDeltaX = str_repeat(substr($AnchorDeltaX, 0, 1), ($NumBits - strlen($AnchorDeltaX))) . $AnchorDeltaX;
		$AnchorDeltaY = str_repeat(substr($AnchorDeltaY, 0, 1), ($NumBits - strlen($AnchorDeltaY))) . $AnchorDeltaY;

		$atom = $TypeFlag . $StraightEdge . $nBits . $ControlDeltaX . $ControlDeltaY . $AnchorDeltaX . $AnchorDeltaY;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packSTRAIGHTEDGERECORD(
	//   boolean GeneralLineFlag, boolean VertLineFlag,
	//                   integer DeltaX, integer DeltaY)
	//  returns an SWF STRAIGHTEDGERECORD string.

	function packSTRAIGHTEDGERECORD($GeneralLineFlag, $VertLineFlag, $DeltaX, $DeltaY)
	{
		array_push($this->FMDebug, "packSTRAIGHTEDGERECORD");

		$TypeFlag = "1";
		$StraightEdge = "1";

		if (($DeltaX == 0) and ($DeltaY == 0)) {

			$atom = sprintf("%1d", $TypeFlag) . sprintf("%1d", $StraightEdge) . "0" ;

		} else {

			$DeltaX = $this->packSBchunk($DeltaX); 
			$DeltaY = $this->packSBchunk($DeltaY);

			$NumBits = (int) max(strlen($DeltaX), strlen($DeltaY));

			$nBits = $this->packnBits(($NumBits - 2), 4);

			$DeltaX = str_repeat(substr($DeltaX, 0, 1), ($NumBits - strlen($DeltaX))) . $DeltaX;
			$DeltaY = str_repeat(substr($DeltaY, 0, 1), ($NumBits - strlen($DeltaY))) . $DeltaY;

			$atom = sprintf("%1d", $TypeFlag) . sprintf("%1d", $StraightEdge) . $nBits . sprintf("%1d", $GeneralLineFlag);

			if ($GeneralLineFlag) {

				$atom .= $DeltaX . $DeltaY;

			} else {

				if ($VertLineFlag) {

					$atom .= sprintf("%1d", $VertLineFlag) . $DeltaY; 
				} else {

					$atom .= sprintf("%1d", $VertLineFlag) . $DeltaX; 
				}
			}
		}

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packSTYLECHANGERECORD(
	//                          integer StateNewStyles,
	//                          integer StateLineStyle, 
	//                         integer StateFillStyle1,
	//    integer StateFillStyle0, integer StateMoveTo,
	//          integer MoveDeltaX, integer MoveDeltaY, 
	//            integer nFillBits, integer nLineBits, 
	//          integer FillStyle0, integer FillStyle1,
	//            integer LineStyle, string FillStyles,
	//          string LineStyles, integer NumFillBits,
	//                              integer NumLineBits)
	//  returns an SWF STYLECHANGERECORD string.

	function packSTYLECHANGERECORD($StateNewStyles, $StateLineStyle, $StateFillStyle1, $StateFillStyle0, $StateMoveTo, $MoveDeltaX, $MoveDeltaY, $nFillBits, $nLineBits, $FillStyle0, $FillStyle1, $LineStyle, $FillStyles, $LineStyles, $NumFillBits, $NumLineBits)
	{
#error_log("statennewstyles: $StateNewStyles, statelinestyle: $StateLineStyle, statefillstyle1: $StateFillStyle1, statefillstyle0: $StateFillStyle0, statemoveto: $StateMoveTo, movedeltaX: $MoveDeltaX, movedeltay: $MoveDeltaY, nfillbits: $nFillBits, nlinebits: $nLineBits, fillstyle0: $FillStyle0, fillstyle1: $FillStyle1, linestyle: $LineStyle, fillstyles: $FillStyles, linestyles: $LineStyles, numfillbits: $NumFillBits, numlinebits: $NumLineBits");
#error_log("nFillBits: $nFillBits");
#error_log("nLineBits: $nLineBits");
		array_push($this->FMDebug, "packSTYLECHANGERECORD");

		$atom = array("Bitstream" => "", "Bytestream" => "");
		$atom["Bitstream"] .= "0";

		$atom["Bitstream"] .= sprintf("%1d", $StateNewStyles);
		$atom["Bitstream"] .= sprintf("%1d", $StateLineStyle);
		$atom["Bitstream"] .= sprintf("%1d", $StateFillStyle1);
		$atom["Bitstream"] .= sprintf("%1d", $StateFillStyle0);
		$atom["Bitstream"] .= sprintf("%1d", $StateMoveTo);

		if ($StateMoveTo == 1) {

			$MoveDeltaX = $this->packSBchunk($MoveDeltaX); 
			$MoveDeltaY = $this->packSBchunk($MoveDeltaY);

			$MoveBits = (int) max(strlen($MoveDeltaX), strlen($MoveDeltaY));
			$nMoveBits = $this->packnBits($MoveBits, 5);

			$MoveDeltaX = str_repeat(substr($MoveDeltaX, 0, 1), ($MoveBits - strlen($MoveDeltaX))) . $MoveDeltaX;
			$MoveDeltaY = str_repeat(substr($MoveDeltaY, 0, 1), ($MoveBits - strlen($MoveDeltaY))) . $MoveDeltaY;

			$atom["Bitstream"] .= $nMoveBits . $MoveDeltaX . $MoveDeltaY;
		}

		if ($StateFillStyle0) {

			$atom["Bitstream"] .= $this->packnBits($FillStyle0, $nFillBits);
		} 

		if ($StateFillStyle1) {

			$atom["Bitstream"] .= $this->packnBits($FillStyle1, $nFillBits);
		} 

		if ($StateLineStyle) {

			$atom["Bitstream"] .= $this->packnBits($LineStyle, $nLineBits);
			#error_log($this->packnBits($LineStyle, $nLineBits));
			#error_log("here?");
		} 

		if ($StateNewStyles) {

			$atom["Bytestream"] = $FillStyles . $LineStyles . $this->packUI8((int)($this->packnBits($NumFillBits, 4) . $this->packnBits($NumLineBits, 4)));
		} 

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packENDSHAPERECORD()
	//  returns an SWF ENDSHAPERECORD string.

	function packENDSHAPERECORD()
	{
		array_push($this->FMDebug, "packENDSHAPERECORD");

		$TypeFlag = "0";
		$EndOfShape = "00000";

		$atom = $TypeFlag . $EndOfShape;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packSHAPEWITHSTYLE(string FillStyles, 
	//          string LineStyles, integer NumFillBits, 
	//         integer NumLineBits, string ShapeRecords) 
	//  returns an SWF SHAPEWITHSTYLE string.

	function packSHAPEWITHSTYLE($FillStyles, $LineStyles, $NumFillBits, $NumLineBits, $ShapeRecords)
	{
		array_push($this->FMDebug, "packSHAPEWITHSTYLE");

		$lower_limit = 0;
		$upper_limit = 15;

		if (($NumFillBits < $lower_limit) or ($NumFillBits > $upper_limit)) {
			$this->FMError("packSHAPEWITHSTYLE argument (NumFillBits) out of range");
		}

		if (($NumLineBits < $lower_limit) or ($NumLineBits > $upper_limit)) {
			$this->FMError("packSHAPEWITHSTYLE argument (NumLineBits) out of range");
		}

		$atom  = $FillStyles;
		$atom .= $LineStyles;

		$NumFillBits = $this->packnBits($NumFillBits, 4);
		$NumLineBits = $this->packnBits($NumLineBits, 4);

		$atom .= $this->packBitValues($NumFillBits . $NumLineBits);
		$atom .= $ShapeRecords;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packSHAPE(integer NumFillBits, 
	//         integer NumLineBits, string ShapeRecords) 
	//  returns an SWF SHAPE string.

	function packSHAPE($NumFillBits, $NumLineBits, $ShapeRecords)
	{
		array_push($this->FMDebug, "packSHAPE");

		$lower_limit = 0;
		$upper_limit = 15;

		if (($NumFillBits < $lower_limit) or ($NumFillBits > $upper_limit)) {
			$this->FMError("packSHAPE argument (NumFillBits) out of range");
		}

		if (($NumLineBits < $lower_limit) or ($NumLineBits > $upper_limit)) {
			$this->FMError("packSHAPE argument (NumLineBits) out of range");
		}

		$atom  = $this->packnBits($NumFillBits, 4);
		$atom .= $this->packnBits($NumLineBits, 4);

		$atom  = $this->packBitValues($atom);
		$atom .= $ShapeRecords;

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packASSET(integer Tag, string Label)
	//  returns an ASSET string used by ExportAssets
	//  and ImportAssets tags.

	function packASSET($Tag, $Label)
	{
		array_push($this->FMDebug, "packASSET");

		$atom  = $this->packUI16($Tag);
		$atom .= $this->packSTRING($Label);

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  array parseJPEGfile(string filename)
	//  returns an array that holds the given JPEG file
	//  broken up into chunks.

	function parseJPEGfile($filename)
	{
		array_push($this->FMDebug, "parseJPEGfile");

		$SOI  = chr(0xff) . chr(0xd8);
		$APP0 = chr(0xff) . chr(0xe0);
		$DQT  = chr(0xff) . chr(0xdb);
		$SOF0 = chr(0xff) . chr(0xc0);
		$SOF1 = chr(0xff) . chr(0xc1);
		$SOF2 = chr(0xff) . chr(0xc2);
		$DHT  = chr(0xff) . chr(0xc4);
		$DRI  = chr(0xff) . chr(0xdd);
		$SOS  = chr(0xff) . chr(0xda);
		$EOI  = chr(0xff) . chr(0xd9);
		$COM  = chr(0xff) . chr(0xfe);

		$filearray = array("JPEGEncoding" => "", "JPEGImage" => "");

		$filehandle = fopen($filename, "r");

		if ($filehandle == FALSE) {
			$this->FMError("parseJPEGfile cannot open file");
		}

		$jpeg = fread($filehandle, filesize($filename));

		fclose($filehandle);

		$marker = strpos($jpeg, $SOI);

		$jpeg = substr($jpeg, $marker);

		$loop = True;

		while ($loop == True) {

			if (strlen($jpeg) == 0) {
				$loop = False;
			}

			switch (substr($jpeg, 0, 2)) {

				case $SOI:

					$filearray["JPEGEncoding"] = $SOI;
					$filearray["JPEGImage"] = $SOI;
					$jpeg = substr($jpeg, 2);
					break;

				case $APP0:

					$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
					$filearray["JPEGImage"] .= substr($jpeg, 0, $blocklength + 2);
					$jpeg = substr($jpeg, $blocklength + 2);
					break;

				case $DQT:

					$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
					$filearray["JPEGEncoding"] .= substr($jpeg, 0, $blocklength + 2);
					$jpeg = substr($jpeg, $blocklength + 2);
					break;

				case $SOF0:
				case $SOF1:
				case $SOF2:

					$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
					$filearray["JPEGImage"] .= substr($jpeg, 0, $blocklength + 2);
					$filearray["width"] = ord(substr($jpeg, 7, 1)) * 256 + ord(substr($jpeg, 8, 1));	
					$filearray["height"] = ord(substr($jpeg, 5, 1)) * 256 + ord(substr($jpeg, 6, 1));	
					$jpeg = substr($jpeg, $blocklength + 2);
					break;

				case $DHT:

					$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
					$filearray["JPEGEncoding"] .= substr($jpeg, 0, $blocklength + 2);
					$jpeg = substr($jpeg, $blocklength + 2);
					break;

				case $DRI:

					$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
					$filearray["JPEGImage"] .= substr($jpeg, 0, $blocklength + 2);
					$jpeg = substr($jpeg, $blocklength + 2);
					break;

				case $COM:

					$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
					$jpeg = substr($jpeg, $blocklength + 2);
					break;
				case $EOI:

					$filearray["JPEGEncoding"] .= $EOI;
					$filearray["JPEGImage"] .= $EOI;
					$loop = False;
					break;

				default:

					if (substr($jpeg, 0, 2) == $SOS) {

						$blocklength = ord(substr($jpeg, 2, 1)) * 256 + ord(substr($jpeg, 3, 1));	
						$filearray["JPEGImage"] .= substr($jpeg, 0, $blocklength + 2);
						$jpeg = substr($jpeg, $blocklength + 2);
						$marker = strpos($jpeg, chr(255));
						$filearray["JPEGImage"] .= substr($jpeg, 0, $marker);
						$jpeg = substr($jpeg, $marker);
						$foundsos = True;

					} else {

						if ($foundsos) {
	
							$filearray["JPEGImage"] .= substr($jpeg, 0, 1);
							$jpeg = substr($jpeg, 1);
							$marker = strpos($jpeg, chr(255));
							$filearray["JPEGImage"] .= substr($jpeg, 0, $marker);
							$jpeg = substr($jpeg, $marker);
						} else {

							$this->FMError("parseJPEGfile error parsing JPEG file file");
						}
					}
			}

		};

		array_pop($this->FMDebug);

		return $filearray;
	}

	//--------------------------------------------------
	//  array parseTIFFfile(string filename, 
	//                               array AlphaPalette)
	//  returns an array that holds the given JPEG file
	//  broken up into chunks.

	function parseTIFFfile($filename, $AlphaPalette)
	{
		array_push($this->FMDebug, "parseTIFFfile");

		$II = chr(0x49) . chr(0x49);
		$MM = chr(0x4d) . chr(0x4d);

		$TIFFNewSubfileType = array("II" => chr(0xfe) . chr(0x00), "MM" => chr(0x00) . chr(0xfe));
		$TIFFSubfileType = array("II" => chr(0xff) . chr(0x00), "MM" => chr(0x00) . chr(0xff));
		$TIFFImageWidth = array("II" => chr(0x00) . chr(0x01), "MM" => chr(0x01) . chr(0x00));
		$TIFFImageLength = array("II" => chr(0x01) . chr(0x01), "MM" => chr(0x01) . chr(0x01));
		$TIFFBitsPerSample = array("II" => chr(0x02) . chr(0x01), "MM" => chr(0x01) . chr(0x02));
		$TIFFCompression = array("II" => chr(0x03) . chr(0x01), "MM" => chr(0x01) . chr(0x03));
		$TIFFPhotometricInterpretation = array("II" => chr(0x06) . chr(0x01), "MM" => chr(0x01) . chr(0x06));
		$TIFFThresholding = array("II" => chr(0x07) . chr(0x01), "MM" => chr(0x01) . chr(0x07));
		$TIFFCellWidth = array("II" => chr(0x08) . chr(0x01), "MM" => chr(0x01) . chr(0x08));
		$TIFFCellLength = array("II" => chr(0x09) . chr(0x01), "MM" => chr(0x01) . chr(0x09));
		$TIFFFillOrder = array("II" => chr(0x0a) . chr(0x01), "MM" => chr(0x01) . chr(0x0a));
		$TIFFDocumentName = array("II" => chr(0x0d) . chr(0x01), "MM" => chr(0x01) . chr(0x0d));
		$TIFFImageDescription = array("II" => chr(0x0e) . chr(0x01), "MM" => chr(0x01) . chr(0x0e));
		$TIFFMake = array("II" => chr(0x0f) . chr(0x01), "MM" => chr(0x01) . chr(0x0f));
		$TIFFModel = array("II" => chr(0x10) . chr(0x01), "MM" => chr(0x01) . chr(0x10));
		$TIFFStripOffsets = array("II" => chr(0x11) . chr(0x01), "MM" => chr(0x01) . chr(0x11));
		$TIFFOrientation = array("II" => chr(0x12) . chr(0x01), "MM" => chr(0x01) . chr(0x12));
		$TIFFSamplesPerPixel = array("II" => chr(0x15) . chr(0x01), "MM" => chr(0x01) . chr(0x15));
		$TIFFRowsPerStrip = array("II" => chr(0x16) . chr(0x01), "MM" => chr(0x01) . chr(0x16));
		$TIFFStripByteCounts = array("II" => chr(0x17) . chr(0x01), "MM" => chr(0x01) . chr(0x17));
		$TIFFMinSampleValue = array("II" => chr(0x18) . chr(0x01), "MM" => chr(0x01) . chr(0x18));
		$TIFFMaxSampleValue = array("II" => chr(0x19) . chr(0x01), "MM" => chr(0x01) . chr(0x19));
		$TIFFXResolution = array("II" => chr(0x1a) . chr(0x01), "MM" => chr(0x01) . chr(0x1a));
		$TIFFYResolution = array("II" => chr(0x1b) . chr(0x01), "MM" => chr(0x01) . chr(0x1b));
		$TIFFPlanarConfiguration = array("II" => chr(0x1c) . chr(0x01), "MM" => chr(0x01) . chr(0x1c));
		$TIFFPageName = array("II" => chr(0x1d) . chr(0x01), "MM" => chr(0x01) . chr(0x1d));
		$TIFFXPosition = array("II" => chr(0x1e) . chr(0x01), "MM" => chr(0x01) . chr(0x1e));
		$TIFFYPosition = array("II" => chr(0x1f) . chr(0x01), "MM" => chr(0x01) . chr(0x1f));
		$TIFFFreeOffsets = array("II" => chr(0x20) . chr(0x01), "MM" => chr(0x01) . chr(0x20));
		$TIFFFreeByteCounts = array("II" => chr(0x21) . chr(0x01), "MM" => chr(0x01) . chr(0x21));
		$TIFFGrayResponseUnit = array("II" => chr(0x22) . chr(0x01), "MM" => chr(0x01) . chr(0x22));
		$TIFFGrayResponseCurve = array("II" => chr(0x23) . chr(0x01), "MM" => chr(0x01) . chr(0x23));
		$TIFFT4Options = array("II" => chr(0x24) . chr(0x01), "MM" => chr(0x01) . chr(0x24));
		$TIFFT6Options = array("II" => chr(0x25) . chr(0x01), "MM" => chr(0x01) . chr(0x25));
		$TIFFResolutionUnit = array("II" => chr(0x28) . chr(0x01), "MM" => chr(0x01) . chr(0x28));
		$TIFFPageNumber = array("II" => chr(0x29) . chr(0x01), "MM" => chr(0x01) . chr(0x29));
		$TIFFTransferFunction = array("II" => chr(0x2d) . chr(0x01), "MM" => chr(0x01) . chr(0x2d));
		$TIFFSoftware = array("II" => chr(0x31) . chr(0x01), "MM" => chr(0x01) . chr(0x31));
		$TIFFDateTime = array("II" => chr(0x32) . chr(0x01), "MM" => chr(0x01) . chr(0x32));
		$TIFFArtist = array("II" => chr(0x3b) . chr(0x01), "MM" => chr(0x01) . chr(0x3b));
		$TIFFHostComputer = array("II" => chr(0x3c) . chr(0x01), "MM" => chr(0x01) . chr(0x3c));
		$TIFFPredictor = array("II" => chr(0x3d) . chr(0x01), "MM" => chr(0x01) . chr(0x3d));
		$TIFFWhitePoint = array("II" => chr(0x3e) . chr(0x01), "MM" => chr(0x01) . chr(0x3e));
		$TIFFPrimaryChromaticities = array("II" => chr(0x3f) . chr(0x01), "MM" => chr(0x01) . chr(0x3f));
		$TIFFColorMap = array("II" => chr(0x40) . chr(0x01), "MM" => chr(0x01) . chr(0x40));
		$TIFFHalftoneHints = array("II" => chr(0x41) . chr(0x01), "MM" => chr(0x01) . chr(0x41));
		$TIFFTileWidth = array("II" => chr(0x42) . chr(0x01), "MM" => chr(0x01) . chr(0x42));
		$TIFFTileLength = array("II" => chr(0x43) . chr(0x01), "MM" => chr(0x01) . chr(0x43));
		$TIFFTileOffsets = array("II" => chr(0x44) . chr(0x01), "MM" => chr(0x01) . chr(0x44));
		$TIFFTileByteCounts = array("II" => chr(0x45) . chr(0x01), "MM" => chr(0x01) . chr(0x45));
		$TIFFInkSet = array("II" => chr(0x4c) . chr(0x01), "MM" => chr(0x01) . chr(0x4c));
		$TIFFInkNames = array("II" => chr(0x4d) . chr(0x01), "MM" => chr(0x01) . chr(0x4d));
		$TIFFNumberOfInks = array("II" => chr(0x4e) . chr(0x01), "MM" => chr(0x01) . chr(0x4e));
		$TIFFDotRange = array("II" => chr(0x50) . chr(0x01), "MM" => chr(0x01) . chr(0x50));
		$TIFFTargetPrinter = array("II" => chr(0x51) . chr(0x01), "MM" => chr(0x01) . chr(0x51));
		$TIFFExtraSamples = array("II" => chr(0x52) . chr(0x01), "MM" => chr(0x01) . chr(0x52));
		$TIFFSampleFormat = array("II" => chr(0x53) . chr(0x01), "MM" => chr(0x01) . chr(0x53));
		$TIFFSMinSampleValue = array("II" => chr(0x54) . chr(0x01), "MM" => chr(0x01) . chr(0x54));
		$TIFFSMaxSampleValue = array("II" => chr(0x55) . chr(0x01), "MM" => chr(0x01) . chr(0x55));
		$TIFFTransferRange = array("II" => chr(0x56) . chr(0x01), "MM" => chr(0x01) . chr(0x56));
		$TIFFJPEGProc = array("II" => chr(0x00) . chr(0x02), "MM" => chr(0x02) . chr(0x00));
		$TIFFJPEGInterchangeFormat = array("II" => chr(0x01) . chr(0x02), "MM" => chr(0x02) . chr(0x01));
		$TIFFJPEGInterchangeFormatLength = array("II" => chr(0x02) . chr(0x02), "MM" => chr(0x02) . chr(0x02));
		$TIFFJPEGRestartInterval = array("II" => chr(0x03) . chr(0x02), "MM" => chr(0x02) . chr(0x03));
		$TIFFJPEGLosslessPredictors = array("II" => chr(0x05) . chr(0x02), "MM" => chr(0x02) . chr(0x05));
		$TIFFJPEGPointTransforms = array("II" => chr(0x06) . chr(0x02), "MM" => chr(0x02) . chr(0x06));
		$TIFFJPEGQTables = array("II" => chr(0x07) . chr(0x02), "MM" => chr(0x02) . chr(0x07));
		$TIFFJPEGDCTables = array("II" => chr(0x08) . chr(0x02), "MM" => chr(0x02) . chr(0x08));
		$TIFFJPEGACTables = array("II" => chr(0x09) . chr(0x02), "MM" => chr(0x02) . chr(0x09));
		$TIFFYCbCrCoefficients = array("II" => chr(0x11) . chr(0x02), "MM" => chr(0x02) . chr(0x11));
		$TIFFYCbCrSubSampling = array("II" => chr(0x12) . chr(0x02), "MM" => chr(0x02) . chr(0x12));
		$TIFFYCbCrPositioning = array("II" => chr(0x13) . chr(0x02), "MM" => chr(0x02) . chr(0x13));
		$TIFFReferenceBlackWhite = array("II" => chr(0x14) . chr(0x02), "MM" => chr(0x02) . chr(0x14));
		$TIFFCopyright = array("II" => chr(0x98) . chr(0x82), "MM" => chr(0x82) . chr(0x98));

		$TIFFfile = array();

		$filehandle = fopen($filename, "r");

		if ($filehandle == FALSE) {
			$this->FMError("parseTIFFfile cannot open file");
		}

		$tiff = fread($filehandle, filesize($filename));

		fclose($filehandle);

		$byteorder = substr($tiff, 0, 2);
		$filetype = substr($tiff, 2, 2);
		$ifdoffset = substr($tiff, 4, 4);
		$valueoffset = substr($tiff, 8, 4);

		if ($byteorder == $II) {

			if ($filetype != chr(0x2a) . chr(0x00)) {

				$this->FMError("parseTIFFfile -- not a TIFF file!");

			}

			$ifdoffset = (ord(substr($ifdoffset, 3, 1)) * 256 + ord(substr($ifdoffset, 2, 1))) * 65536 + ord(substr($ifdoffset, 1, 1)) * 256 + ord(substr($ifdoffset, 0, 1)); 

			$valueoffset = (ord(substr($valueoffset, 3, 1)) * 256 + ord(substr($valueoffset, 2, 1))) * 65536 + ord(substr($valueoffset, 1, 1)) * 256 + ord(substr($valueoffset, 0, 1)); 

		}

		//--------------------------------------------------
		//  unpack MM byte order TIFF.

		if ($byteorder == $MM) {

			$this->FMError("Cannot handle MM byte order in TIFF files, yet");

		}

		$ifdtags = substr($tiff, $ifdoffset, 2);

		//--------------------------------------------------
		//  unpack II byte order TIFF.

		if ($byteorder == $II) {

			$ifdtags = ord(substr($ifdtags, 1, 1)) * 256 + ord(substr($ifdtags, 0, 1));

			for ($n = 0; $n < $ifdtags; $n++) {

				$tag = substr($tiff, $ifdoffset + 2 + $n * 12, 2);

				$valuetype = substr($tiff, $ifdoffset + 2 + $n * 12 + 2, 2);
				$valuetype = ord(substr($valuetype, 1, 1)) * 256 + ord(substr($valuetype, 0, 1));

				switch($tag) {

					case $TIFFNewSubfileType["II"]:
						break;

					case $TIFFSubfileType["II"]:
						break;

					case $TIFFImageWidth["II"]:

						if ($valuetype == 3) {

							$imagewidth = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$imagewidth = ord(substr($imagewidth, 1, 1)) * 256 + ord(substr($imagewidth, 0, 1)); 
							$TIFFfile["ImageWidth"] = $imagewidth;

						} elseif ($valuetype == 4) {

							$imagewidth = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
							$imagewidth = (ord(substr($imagewidth, 3, 1)) * 256 + ord(substr($imagewidth, 2, 1))) * 65536 + ord(substr($imagewidth, 1, 1)) * 256 + ord(substr($imagewidth, 0, 1)); 
							$TIFFfile["ImageWidth"] = $imagewidth;

						} else {

							$this->FMError("ImageWidth tag: wrong data type");

						}

						break;

					case $TIFFImageLength["II"]:

						if ($valuetype == 3) {

							$imagelength = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$imagelength = ord(substr($imagelength, 1, 1)) * 256 + ord(substr($imagelength, 0, 1)); 
							$TIFFfile["ImageLength"] = $imagelength;

						} elseif ($valuetype == 4) {

							$imagelength = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
							$imagelength = (ord(substr($imagelength, 3, 1)) * 256 + ord(substr($imagelength, 2, 1))) * 65536 + ord(substr($imagelength, 1, 1)) * 256 + ord(substr($imagelength, 0, 1)); 
							$TIFFfile["ImageLength"] = $imagelength;

						} else {

							$this->FMError("ImageLength tag: wrong data type");

						}

						break;

					case $TIFFBitsPerSample["II"]:

						if ($valuetype == 3) {

							$nvalues = substr($tiff, $ifdoffset + 2 + $n * 12 + 4, 4);
							$nvalues = (ord(substr($nvalues, 3, 1)) * 256 + ord(substr($nvalues, 2, 1))) * 65536 + ord(substr($nvalues, 1, 1)) * 256 + ord(substr($nvalues, 0, 1));

							$TIFFfile["BitsPerSample"] = array();

							if ($nvalues == 1) {

								$bitspersample = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
								$bitspersample = ord(substr($bitspersample, 1, 1)) * 256 + ord(substr($bitspersample, 0, 1));
								$TIFFfile["BitsPerSample"][0] = $bitspersample;

	
							} else {

								$voffset = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
								$voffset = (ord(substr($voffset, 3, 1)) * 256 + ord(substr($voffset, 2, 1))) * 65536 + ord(substr($voffset, 1, 1)) * 256 + ord(substr($voffset, 0, 1));

								for ($counter = 0; $counter < $nvalues; $counter++) {

									$foffset = $voffset + 2 * $counter;
									$bitspersample = ord(substr($tiff, $foffset + 1, 1)) * 256 + ord(substr($tiff, $foffset, 1));
									$TIFFfile["BitsPerSample"][$counter] = $bitspersample;

								}

							}

						} else {

							$this->FMError("BitsPerSample: wrong tag value type");

						}

						break;

					case $TIFFCompression["II"]:

						if ($valuetype == 3) {

							$compression = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$compression = ord(substr($compression, 1, 1)) * 256 + ord(substr($compression, 0, 1)); 

							if ($compression == 1) {

								$TIFFfile["Compression"] = $compression;

							} else {

								$this->FMError("Cannot handle this kind of compression yet");

							}

						} else {

							$this->FMError("Compression tag: wrong data type");

						}

						if ($TIFFfile["Compression"] != 1) {

							$this->FMError("Cannot Handle compressed TIFF files, sorry.");

						}

						break;

					case $TIFFPhotometricInterpretation["II"]:

						if ($valuetype == 3) {

							$interpretation = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$interpretation = ord(substr($interpretation, 1, 1)) * 256 + ord(substr($interpretation, 0, 1)); 
							$TIFFfile["PhotometricInterpretation"] = $interpretation;

						} else {

							$this->FMError("PhotometricInterpretation tag: wrong data type");

						}

						break;

					case $TIFFThresholding["II"]:
						break;

					case $TIFFCellWidth["II"]:
						break;

					case $TIFFCellLength["II"]:
						break;

					case $TIFFFillOrder["II"]:

						if ($valuetype == 3) {

							$fillorder = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$fillorder = ord(substr($fillorder, 1, 1)) * 256 + ord(substr($fillorder, 0, 1)); 
							$TIFFfile["FillOrder"] = $fillorder;

						} else {

							$this->FMError("FillOrder tag: wrong data type");

						}

						break;

					case $TIFFDocumentName["II"]:
						break;

					case $TIFFImageDescription["II"]:
						break;

					case $TIFFMake["II"]:
						break;

					case $TIFFModel["II"]:
						break;

					case $TIFFStripOffsets["II"]:

						$nvalues = substr($tiff, $ifdoffset + 2 + $n * 12 + 4, 4);
						$nvalues = (ord(substr($nvalues, 3, 1)) * 256 + ord(substr($nvalues, 2, 1))) * 65536 + ord(substr($nvalues, 1, 1)) * 256 + ord(substr($nvalues, 0, 1)); 
						$voffset = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
						$voffset = (ord(substr($voffset, 3, 1)) * 256 + ord(substr($voffset, 2, 1))) * 65536 + ord(substr($voffset, 1, 1)) * 256 + ord(substr($voffset, 0, 1)); 

						$TIFFfile["StripOffsets"] = array();

						if ($valuetype == 3) {

							if ($nvalues == 1) {

								$TIFFfile["StripOffsets"][0] = $voffset;

							} else {

								for ($counter = 0; $counter < $nvalues; $counter++) {

									$foffset = $voffset + 2 * $counter;

									$stripoffsets = ord(substr($tiff, $foffset + 1, 1)) * 256 + ord(substr($tiff, $foffset, 1)); 
									$TIFFfile["StripOffsets"][$counter] = $stripoffsets;

								}

							}

						} elseif ($valuetype == 4) { 

							if ($nvalues == 1) {

								$TIFFfile["StripOffsets"][0] = $voffset;

							} else {

								for ($counter = 0; $counter < $nvalues; $counter++) {

									$foffset = $voffset + 4 * $counter;

									$stripoffsets = (ord(substr($tiff, $foffset + 3, 1)) * 256 + ord(substr($tiff, $foffset + 2, 1))) * 65536 + ord(substr($tiff, $foffset + 1, 1)) * 256 + ord(substr($tiff, $foffset, 1)); 
									$TIFFfile["StripOffsets"][$counter] = $stripoffsets;

								}

							}

						} else {

							$this->FMError("StripOffsets: wrong tag value type");

						}

						break;

					case $TIFFOrientation["II"]:

						if ($valuetype == 3) {

							$subfiletype = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$subfiletype = ord(substr($subfiletype, 1, 1)) * 256 + ord(substr($subfiletype, 0, 1)); 
							$TIFFfile["Orientation"] = $subfiletype;

						} else {

							$this->FMError("Orientation tag: wrong data type");

						}

						break;

					case $TIFFSamplesPerPixel["II"]:

						if ($valuetype == 3) {

							$samplesperpixel = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$samplesperpixel = ord(substr($samplesperpixel, 1, 1)) * 256 + ord(substr($samplesperpixel, 0, 1)); 
							$TIFFfile["SamplesPerPixel"] = $samplesperpixel;

						} else {

							$this->FMError("SamplesPerPixel tag: wrong data type");

						}

						break;

					case $TIFFRowsPerStrip["II"]:

						if ($valuetype == 3) {

							$rowsperstrip = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$rowsperstrip = ord(substr($rowsperstrip, 1, 1)) * 256 + ord(substr($rowsperstrip, 0, 1)); 
							$TIFFfile["RowsPerStrip"] = $rowsperstrip;

						} elseif ($valuetype == 4) {

							$rowsperstrip = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
							$rowsperstrip = (ord(substr($rowsperstrip, 3, 1)) * 256 + ord(substr($rowsperstrip, 2, 1))) * 65536 + ord(substr($rowsperstrip, 1, 1)) * 256 + ord(substr($rowsperstrip, 0, 1)); 
							$TIFFfile["RowsPerStrip"] = $rowsperstrip;

						} else {

							$this->FMError("RowsPerStrip tag: wrong data type");

						}

						break;

					case $TIFFStripByteCounts["II"]:

						$nvalues = substr($tiff, $ifdoffset + 2 + $n * 12 + 4, 4);
						$nvalues = (ord(substr($nvalues, 3, 1)) * 256 + ord(substr($nvalues, 2, 1))) * 65536 + ord(substr($nvalues, 1, 1)) * 256 + ord(substr($nvalues, 0, 1)); 
						$voffset = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
						$voffset = (ord(substr($voffset, 3, 1)) * 256 + ord(substr($voffset, 2, 1))) * 65536 + ord(substr($voffset, 1, 1)) * 256 + ord(substr($voffset, 0, 1)); 

						$TIFFfile["StripByteCounts"] = array();

						if ($valuetype == 3) {

							if ($nvalues == 1) {

								$TIFFfile["StripByteCounts"][0] = $voffset;

							} else {

								for ($counter = 0; $counter < $nvalues; $counter++) {

									$foffset = $voffset + 2 * $counter;

									$stripbytecounts = ord(substr($tiff, $foffset + 1, 1)) * 256 + ord(substr($tiff, $foffset, 1)); 
									$TIFFfile["StripByteCounts"][$counter] = $stripbytecounts;

								}

							}

						} elseif ($valuetype == 4) { 

							if ($nvalues == 1) {

								$TIFFfile["StripByteCounts"][0] = $voffset;

							} else {

								for ($counter = 0; $counter < $nvalues; $counter++) {

									$foffset = $voffset + 4 * $counter;

									$stripbytecounts = (ord(substr($tiff, $foffset + 3, 1)) * 256 + ord(substr($tiff, $foffset + 2, 1))) * 65536 + ord(substr($tiff, $foffset + 1, 1)) * 256 + ord(substr($tiff, $foffset, 1)); 
									$TIFFfile["StripByteCounts"][$counter] = $stripbytecounts;

								}

							}

						} else {

							$this->FMError("StripByteCounts: wrong tag value type");

						}

						break;

					case $TIFFMinSampleValue["II"]:
						break;

					case $TIFFMaxSampleValue["II"]:
						break;

					case $TIFFXResolution["II"]:
						break;

					case $TIFFYResolution["II"]:
						break;

					case $TIFFPlanarConfiguration["II"]:

						if ($valuetype == 3) {

							$planarconfiguration = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$planarconfiguration = ord(substr($planarconfiguration, 1, 1)) * 256 + ord(substr($planarconfiguration, 0, 1)); 
							$TIFFfile["PlanarConfiguration"] = $planarconfiguration;

						} else {

							$this->FMError("PlanarConfiguration tag: wrong data type");

						}

						break;

					case $TIFFPageName["II"]:
						break;

					case $TIFFXPosition["II"]:
						break;

					case $TIFFYPosition["II"]:
						break;

					case $TIFFFreeOffsets["II"]:
						break;

					case $TIFFFreeByteCounts["II"]:
						break;

					case $TIFFGrayResponseUnit["II"]:
						break;

					case $TIFFGrayResponseCurve["II"]:
						break;

					case $TIFFT4Options["II"]:
						break;

					case $TIFFT6Options["II"]:
						break;

					case $TIFFResolutionUnit["II"]:
						break;

					case $TIFFPageNumber["II"]:
						break;

					case $TIFFTransferFunction["II"]:
						break;

					case $TIFFSoftware["II"]:
						break;

					case $TIFFDateTime["II"]:
						break;

					case $TIFFArtist["II"]:
						break;

					case $TIFFHostComputer["II"]:
						break;

					case $TIFFPredictor["II"]:
						break;

					case $TIFFWhitePoint["II"]:
						break;

					case $TIFFPrimaryChromaticities["II"]:
						break;

					case $TIFFColorMap["II"]:

						if ($valuetype == 3) {

							$nvalues = substr($tiff, $ifdoffset + 2 + $n * 12 + 4, 4);
							$nvalues = ord(substr($nvalues, 1, 1)) * 256 + ord(substr($nvalues, 0, 1)); 
							$voffset = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 4);
							$voffset = (ord(substr($voffset, 3, 1)) * 256 + ord(substr($voffset, 2, 1))) * 65536 + ord(substr($voffset, 1, 1)) * 256 + ord(substr($voffset, 0, 1)); 

							$TIFFfile["ColorMap"] = substr($tiff, $voffset, 2 * $nvalues);
						} else {

							$this->FMError("ColorMap: wrong tag value type");

						}

						break;

					case $TIFFHalftoneHints["II"]:
						break;

					case $TIFFTileWidth["II"]:
						break;

					case $TIFFTileLength["II"]:
						break;

					case $TIFFTileOffsets["II"]:
						break;

					case $TIFFTileByteCounts["II"]:
						break;

					case $TIFFInkSet["II"]:
						break;

					case $TIFFInkNames["II"]:
						break;

					case $TIFFNumberOfInks["II"]:
						break;

					case $TIFFExtraSamples["II"]:

						if ($valuetype == 3) {

							$extrasamples = substr($tiff, $ifdoffset + 2 + $n * 12 + 8, 2);
							$extrasamples = ord(substr($extrasamples, 1, 1)) * 256 + ord(substr($extrasamples, 0, 1)); 
							$TIFFfile["ExtraSamples"] = $extrasamples;

						} else {

							$this->FMError("ExtraSamples: wrong data type");

						}

						break;

					case $TIFFSampleFormat["II"]:
						break;

					case $TIFFSMinSampleValue["II"]:
						break;

					case $TIFFSMaxSampleValue["II"]:
						break;

					case $TIFFTransferRange["II"]:
						break;

					case $TIFFJPEGProc["II"]:
						break;

					case $TIFFJPEGInterchangeFormat["II"]:
						break;

					case $TIFFJPEGInterchangeFormatLength["II"]:
						break;

					case $TIFFJPEGRestartInterval["II"]:
						break;

					case $TIFFJPEGLosslessPredictors["II"]:
						break;

					case $TIFFJPEGPointTransforms["II"]:
						break;

					case $TIFFJPEGQTables["II"]:
						break;

					case $TIFFJPEGDCTables["II"]:
						break;

					case $TIFFJPEGACTables["II"]:
						break;

					case $TIFFYCbCrCoefficients["II"]:
						break;

					case $TIFFYCbCrSubSampling["II"]:
						break;

					case $TIFFYCbCrPositioning["II"]:
						break;

					case $TIFFReferenceBlackWhite["II"]:
						break;

					case $TIFFCopyright["II"]:
						break;
				}


			} 

		}

		//--------------------------------------------------
		//  process TIFF data.

		$bitmap = array();

		switch ($TIFFfile["PhotometricInterpretation"]) {
			
			//--------------------------------------------------
			//  Bilevel - WhiteIsZero. 

			case 0:

				if (!(in_array("BitsPerSample", $TIFFfile))) {

				} 

				//--------------------------------------------------
				//  build image stream. 

				$imagestream = "";
				$nstrips = count($TIFFfile["StripOffsets"]);

				for($counter = 0; $counter < $nstrips; $counter++) {
					$imagestream .= substr($tiff, $TIFFfile["StripOffsets"][$counter], $TIFFfile["StripByteCounts"][$counter]); 

				}

				$newimagestream = "";

				$padcount = $TIFFfile["ImageWidth"] % 4;

				if (($padcount) == 0) {

					$padding = "";

				} else {

					$padding = str_repeat(chr(0), 4 - $padcount);
				}

				for($counter = 0; $counter < $TIFFfile["ImageLength"]; $counter++) {

					$newimagestream .= substr($imagestream, $counter * $TIFFfile["ImageWidth"], $TIFFfile["ImageWidth"]) . $padding;

				}

				//--------------------------------------------------
				//  create palettes. 

				$swfcolormap = "";

				if ($AlphaPalette == null) {

					for($counter = 255; $counter >= 0; $counter--) {

						$r = chr($counter);
						$g = chr($counter);
						$b = chr($counter);

						$swfcolormap .= $r . $g . $b;

					}

					$bitmap["colortablesize"]  = (strlen($swfcolormap) / 3) - 1;
				} else {

					$a = array();

					for($counter = 0; $counter < 256; $counter++) {

						$a[$counter] = chr(255);
					}

					$limita = sizeof($AlphaPalette);

					reset($AlphaPalette);

					for ($counter = 0; $counter < $limita; $counter++) {

						$tmp = each($AlphaPalette);

						$a[$tmp["key"]] = chr($tmp["value"]);
					}

					for($counter = 255; $counter >= 0; $counter--) {

						$r = chr($counter);
						$g = chr($counter);
						$b = chr($counter);

						$swfcolormap .= $r . $g . $b . $a[$counter];

					}

					$bitmap["colortablesize"]  = (strlen($swfcolormap) / 4) - 1;
				}

				$zlibbitmapdata = gzcompress($swfcolormap . $newimagestream, 9);
				$alphadata = gzcompress($imagestream, 9);

				break;

			//--------------------------------------------------
			//  Bilevel - BlackIsZero. 

			case 1:


				//--------------------------------------------------
				//  build image stream. 

				$imagestream = "";
				$nstrips = count($TIFFfile["StripOffsets"]);

				for($counter = 0; $counter < $nstrips; $counter++) {
					$imagestream .= substr($tiff, $TIFFfile["StripOffsets"][$counter], $TIFFfile["StripByteCounts"][$counter]); 

				}

				$newimagestream = "";

				$padcount = $TIFFfile["ImageWidth"] % 4;

				if (($padcount) == 0) {

					$padding = "";

				} else {

					$padding = str_repeat(chr(0), 4 - $padcount);
				}

				for($counter = 0; $counter < $TIFFfile["ImageLength"]; $counter++) {

					$newimagestream .= substr($imagestream, $counter * $TIFFfile["ImageWidth"], $TIFFfile["ImageWidth"]) . $padding;

				}

				//--------------------------------------------------
				//  create palette. 

				$swfcolormap = "";

				if ($AlphaPalette == null) {

					for($counter = 0; $counter < 256; $counter++) {

						$r = chr($counter);
						$g = chr($counter);
						$b = chr($counter);

						$swfcolormap .= $r . $g . $b;

					}

					$bitmap["colortablesize"]  = (strlen($swfcolormap) / 3) - 1;
				} else {

					$a = array();

					for($counter = 0; $counter < 256; $counter++) {

						$a[$counter] = chr(255);
					}

					$limita = sizeof($AlphaPalette);

					reset($AlphaPalette);

					for ($counter = 0; $counter < $limita; $counter++) {

						$tmp = each($AlphaPalette);

						$a[$tmp["key"]] = chr($tmp["value"]);
					}

					for($counter = 0; $counter < 256; $counter++) {

						$r = chr($counter);
						$g = chr($counter);
						$b = chr($counter);

						$swfcolormap .= $r . $g . $b . $a[$counter];

					}

					$bitmap["colortablesize"]  = (strlen($swfcolormap) / 4) - 1;
				}

				$zlibbitmapdata = gzcompress($swfcolormap . $newimagestream, 9);
				$alphadata = gzcompress($imagestream, 9);

				break;

			//--------------------------------------------------
			//  RGB. 

			case 2:

				$this->FMError("Cannot handle full-color images, use JPEG instead");

				break;

			//--------------------------------------------------
			//  Palette. 

			case 3:

				//--------------------------------------------------
				//  build image stream.

				$imagestream = "";
				$nstrips = count($TIFFfile["StripOffsets"]);

				for($counter = 0; $counter < $nstrips; $counter++) {
					$imagestream .= substr($tiff, $TIFFfile["StripOffsets"][$counter], $TIFFfile["StripByteCounts"][$counter]); 

				}

				$newimagestream = "";

				$padcount = $TIFFfile["ImageWidth"] % 4;

				if (($padcount) == 0) {

					$padding = "";

				} else {

					$padding = str_repeat(chr(0), 4 - $padcount);
				}

				for($counter = 0; $counter < $TIFFfile["ImageLength"]; $counter++) {

					$newimagestream .= substr($imagestream, $counter * $TIFFfile["ImageWidth"], $TIFFfile["ImageWidth"]) . $padding;

				}

				//--------------------------------------------------
				//  reconfigure palette. 

				$newcolormap = "";
				$limit = strlen($TIFFfile["ColorMap"]);

				for($counter = 0; $counter < $limit; $counter++) {

					$newcolormap .= substr($TIFFfile["ColorMap"], 2 * $counter, 1);
				}

				$swfcolormap = "";

				$limit = strlen($newcolormap) / 3;

				if ($AlphaPalette == null) {

					for($counter = 0; $counter < $limit; $counter++) {

						$r = substr($newcolormap, $counter, 1);
						$g = substr($newcolormap, $counter + $limit, 1);
						$b = substr($newcolormap, $counter + $limit, 1);
						$swfcolormap .= $r . $g . $b;
					}

					$bitmap["colortablesize"]  = (strlen($swfcolormap) / 3) - 1;

				} else {

					$a = array();

					for($counter = 0; $counter < 256; $counter++) {

						$a[$counter] = chr(255);
					}

					$limita = sizeof($AlphaPalette);

					reset($AlphaPalette);

					for ($counter = 0; $counter < $limita; $counter++) {

						$tmp = each($AlphaPalette);

						$a[$tmp["key"]] = chr($tmp["value"]);
					}

					for($counter = 0; $counter < 256; $counter++) {

						$r = substr($newcolormap, $counter, 1);
						$g = substr($newcolormap, $counter + $limit, 1);
						$b = substr($newcolormap, $counter + $limit, 1);
						$swfcolormap .= $r . $g . $b . $a[$counter];

					}

					$bitmap["colortablesize"]  = (strlen($swfcolormap) / 4) - 1;
				}

				$zlibbitmapdata = gzcompress($swfcolormap . $newimagestream, 9);
				$alphadata = gzcompress($imagestream, 9);

				break;

			//--------------------------------------------------
			//  Transparency mask.

			case 4:

				$this->FMError("Cannot handle images with transparency masks, use RGB + Alpha encoding");

				break;

		}

		$bitmap["format"] = 3;
		$bitmap["width"]  = $TIFFfile["ImageWidth"];
		$bitmap["height"] = $TIFFfile["ImageLength"];
		$bitmap["colortable"] = $swfcolormap;
		$bitmap["newimagestream"] = $newimagestream;
		$bitmap["zlibbitmapdata"]  = $zlibbitmapdata;
		$bitmap["alphadata"] = $alphadata;
		
		array_pop($this->FMDebug);

		return $bitmap;

	}

	function parseTrueTypefile($filename)
	{
		array_push($this->FMDebug, "parseTrueTypefile");

		$TTfile = array();

		$filehandle = fopen($filename, "r");

		if ($filehandle == FALSE) {
			$this->FMError("parseTrueTypefile cannot open font file");
		}

		$tt = fread($filehandle, filesize($filename));

		fclose($filehandle);
		
		//--------------------------------------------------
		//  offset subtable

		$ScalerType = substr($tt, 0, 4);

		if (($ScalerType == "true") or ($ScalerType == chr(0x00) . chr(0x01) . chr(0x00) . chr(0x00))) {

			$TTfile["OffsetSubtable"] = array();
			$TTfile["OffsetSubtable"]["ScalerType"] = $ScalerType;
			$TTfile["OffsetSubtable"]["numTables"] = ord(substr($tt, 4, 1)) * 256 + ord(substr($tt, 5, 1)); 
			$TTfile["OffsetSubtable"]["searchRange"] = ord(substr($tt, 6, 1)) * 256 + ord(substr($tt, 7, 1)); 
			$TTfile["OffsetSubtable"]["entrySelector"] = ord(substr($tt, 8, 1)) * 256 + ord(substr($tt, 9, 1)); 
			$TTfile["OffsetSubtable"]["rangeShift"] = ord(substr($tt, 10, 1)) * 256 + ord(substr($tt, 11, 1)); 

		} else {

			$this->FMError("parseTrueTypefile: Not a TrueType font");
		}

		for ($counter = 0; $counter < $TTfile["OffsetSubtable"]["numTables"]; $counter++) {

			//--------------------------------------------------
			//  read tag name
			
			$tmp = 12 + 16 * $counter;

			$tag = substr($tt, $tmp, 4);

			$TTfile[$tag] = array();

			$TTfile[$tag]["checksum"] =  (ord(substr($tt, $tmp + 4, 1)) * 256 + ord(substr($tt, $tmp + 5, 1))) * 65536 + ord(substr($tt, $tmp + 6, 1)) * 256 + ord(substr($tt, $tmp + 7, 1)); 
			$TTfile[$tag]["offset"] =  (ord(substr($tt, $tmp + 8, 1)) * 256 + ord(substr($tt, $tmp + 9, 1))) * 65536 + ord(substr($tt, $tmp + 10, 1)) * 256 + ord(substr($tt, $tmp + 11, 1)); 
			$TTfile[$tag]["length"] =  (ord(substr($tt, $tmp + 12, 1)) * 256 + ord(substr($tt, $tmp + 13, 1))) * 65536 + ord(substr($tt, $tmp + 14, 1)) * 256 + ord(substr($tt, $tmp + 15, 1)); 

		}

		//--------------------------------------------------
		//  decode "cmap" table

		if ($TTfile["cmap"]["offset"] != null) {

			$tmp = $TTfile["cmap"]["offset"];

			$TTfile["cmap"]["version"] = ord(substr($tt, $tmp, 1)) * 256 + ord(substr($tt, $tmp + 1, 1));
			$TTfile["cmap"]["nSubtables"] = ord(substr($tt, $tmp + 2, 1)) * 256 + ord(substr($tt, $tmp + 3, 1));

			$tmpa = $tmp + 4;
#error_log("--- cmap ---");
#error_log("version: " . $TTfile["cmap"]["version"]);
#error_log("nSubtables: " . $TTfile["cmap"]["nSubtables"]);

			for ($counter = 0; $counter < $TTfile["cmap"]["nSubtables"]; $counter++) {

				$TTfile["cmap"]["subtables"][$counter]["platformID"] = ord(substr($tt, $tmpa, 1)) * 256 + ord(substr($tt, $tmpa + 1, 1)); 
				$TTfile["cmap"]["subtables"][$counter]["platformSpecificID"] = ord(substr($tt, $tmpa + 2, 1)) * 256 + ord(substr($tt, $tmpa + 3, 1)); 
				$TTfile["cmap"]["subtables"][$counter]["offset"] = (ord(substr($tt, $tmpa + 4, 1)) * 256 + ord(substr($tt, $tmpa + 5, 1))) * 65536 + ord(substr($tt, $tmpa + 6, 1)) * 256 + ord(substr($tt, $tmpa + 7, 1)); 
				$tmpa += 8;
#error_log("platformID: " . $TTfile["cmap"]["subtables"][$counter]["platformID"]);
#error_log("platformSpecificID: " . $TTfile["cmap"]["subtables"][$counter]["platformSpecificID"]);
#error_log("offset: " . $TTfile["cmap"]["subtables"][$counter]["offset"]);
			}

			for ($counter = 0; $counter < $TTfile["cmap"]["nSubtables"]; $counter++) {

				$tmpa = $tmp + $TTfile["cmap"]["subtables"][$counter]["offset"];

				$TTfile["cmap"]["subtables"][$counter]["format"] = ord(substr($tt, $tmpa, 1)) * 256 + ord(substr($tt, $tmpa + 1, 1)); 
				$TTfile["cmap"]["subtables"][$counter]["length"] = ord(substr($tt, $tmpa + 2, 1)) * 256 + ord(substr($tt, $tmpa + 3, 1)); 
				$TTfile["cmap"]["subtables"][$counter]["language"] = ord(substr($tt, $tmpa + 4, 1)) * 256 + ord(substr($tt, $tmpa + 5, 1)); 
#error_log("format: " . $TTfile["cmap"]["subtables"][$counter]["format"]);
#error_log($TTfile["cmap"]["subtables"][$counter]["length"]);
#error_log($TTfile["cmap"]["subtables"][$counter]["language"]);

				if ($TTfile["cmap"]["subtables"][$counter]["format"] == 0) {

					for ($countert = 0; $countert < 256; $countert++) {
						$TTfile["cmap"]["subtables"][$counter]["glyphIndexArray"][$countert] = ord(substr($tt, $tmpa + 6 + $countert, 1));
#error_log($TTfile["cmap"]["subtables"][$counter]["glyphIndexArray"][$countert]);
					}
				}

				if ($TTfile["cmap"]["subtables"][$counter]["format"] == 2) {

					for ($countert = 0; $countert < 256; $countert++) {
						$TTfile["cmap"]["subtables"][$counter]["subHeaderKeys"][$countert] = ord(substr($tt, $tmpa + 6 + $countert, 1));
#error_log($TTfile["cmap"]["subtables"][$counter]["glyphIndexArray"][$countert]);
					}
				}


			}

		} else {

			$this->FMError("parseTrueTypefile: no cmap table... cannot create proper font mappings");
		}

		//--------------------------------------------------
		//  decode "name" table

		if ($TTfile["name"]["offset"] != null) {

			$tmp = $TTfile["name"]["offset"];

			$TTfile["name"]["format"] = ord(substr($tt, $tmp, 1)) * 256 + ord(substr($tt, $tmp + 1, 1));
			$TTfile["name"]["count"] = ord(substr($tt, $tmp + 2, 1)) * 256 + ord(substr($tt, $tmp + 3, 1));
			$TTfile["name"]["stringOffset"] = ord(substr($tt, $tmp + 4, 1)) * 256 + ord(substr($tt, $tmp + 5, 1));

			for ($counter = 0; $counter < $TTfile["name"]["count"]; $counter++) {
				$tmpa = $tmp + 6 + $counter * 12;

				$TTfile["name"]["records"][$counter]["platformID"] = ord(substr($tt, $tmpa, 1)) * 256 + ord(substr($tt, $tmpa + 1, 1)); 
				$TTfile["name"]["records"][$counter]["platformSpecificID"] = ord(substr($tt, $tmpa + 2, 1)) * 256 + ord(substr($tt, $tmpa + 3, 1));
				$TTfile["name"]["records"][$counter]["languageID"] = ord(substr($tt, $tmpa + 4, 1)) * 256 + ord(substr($tt, $tmpa + 5, 1));
				$TTfile["name"]["records"][$counter]["nameID"] =ord(substr($tt, $tmpa + 6, 1)) * 256 + ord(substr($tt, $tmpa + 7, 1));
				$TTfile["name"]["records"][$counter]["length"] =ord(substr($tt, $tmpa + 8, 1)) * 256 + ord(substr($tt, $tmpa + 9, 1));
				$TTfile["name"]["records"][$counter]["offset"] =ord(substr($tt, $tmpa + 10, 1)) * 256 + ord(substr($tt, $tmpa + 11, 1));
				$TTfile["name"]["records"]["namestring"][$counter] = substr($tt, $tmp + $TTfile["name"]["records"][$counter]["offset"], $TTfile["name"]["records"][$counter]["length"]);

			}

		} else {

			$this->FMError("parseTrueTypefile: no name table... cannot create proper font name entry");
		}

		//--------------------------------------------------
		//  decode "post" table

		if ($TTfile["post"]["offset"] != null) {

			$tmp = $TTfile["post"]["offset"];

			$TTfile["post"]["format"] = ord(substr($tt, $tmp, 1)) * 256 + ord(substr($tt, $tmp + 1, 1)) + (ord(substr($tt, $tmp + 2, 1)) * 256 + ord(substr($tt, $tmp + 3, 1))) / 100000;

			$f_int = ord(substr($tt, $tmp + 4, 1)) * 256 + ord(substr($tt, $tmp + 5, 1));
			$f_fra = round(
					(ord(
						substr($tt, $tmp + 6, 1)
					) * 256
	 				+ 
					ord(
						substr($tt, $tmp + 7, 1)
					)) / 100000, 4
			);

			if ($f_int > 32767) {

				$f_int = -($f_int - 32768);
				$f_fra = -$f_fra;
			}

			$TTfile["post"]["italicAngle"] = $f_int + $f_fra; 

			$f_int = ord(substr($tt, $tmp + 8, 1)) * 256 + ord(substr($tt, $tmp + 9, 1));
			if ($f_int > 32767) {

				$f_int = -($f_int - 32768);
			}
			$TTfile["post"]["underlinePosition"] = $f_int; 

			$f_int = ord(substr($tt, $tmp + 10, 1)) * 256 + ord(substr($tt, $tmp + 11, 1));
			if ($f_int > 32767) {

				$f_int = -($f_int - 32768);
			}
			$TTfile["post"]["underlineThickness"] = $f_int; 

			$f_int = ord(substr($tt, $tmp + 12, 1)) * 256 + ord(substr($tt, $tmp + 13, 1));
			$TTfile["post"]["isFixedPitch"] = $f_int; 

			$f_int = ord(substr($tt, $tmp + 14, 1)) * 256 + ord(substr($tt, $tmp + 15, 1));
			$TTfile["post"]["reserved"] = $f_int; 

			$TTfile["post"]["minMemType42"] = (ord(substr($tt, $tmp + 16, 1)) * 256 + ord(substr($tt, $tmp + 17, 1))) * 65536 + ord(substr($tt, $tmp + 18, 1)) * 256 + ord(substr($tt, $tmp + 19, 1)); 
			$TTfile["post"]["maxMemType42"] = (ord(substr($tt, $tmp + 20, 1)) * 256 + ord(substr($tt, $tmp + 21, 1))) * 65536 + ord(substr($tt, $tmp + 22, 1)) * 256 + ord(substr($tt, $tmp + 23, 1)); 
			$TTfile["post"]["minMemType1"] = (ord(substr($tt, $tmp + 24, 1)) * 256 + ord(substr($tt, $tmp + 25, 1))) * 65536 + ord(substr($tt, $tmp + 26, 1)) * 256 + ord(substr($tt, $tmp + 27, 1)); 
			$TTfile["post"]["maxMemType1"] = (ord(substr($tt, $tmp + 28, 1)) * 256 + ord(substr($tt, $tmp + 29, 1))) * 65536 + ord(substr($tt, $tmp + 30, 1)) * 256 + ord(substr($tt, $tmp + 31, 1)); 

			if ($TTfile["post"]["format"] = 2) {

				$tmp += 32;

				$nGlyphs = ord(substr($tt, $tmp, 1)) * 256 + ord(substr($tt, $tmp + 1, 1));
				$TTfile["post"]["subtable"]["nGlyphs"] = $nGlyphs;
				$tmp += 2;

				for ($counter = 0; $counter < $nGlyphs; $counter++) {

					$TTfile["post"]["subtable"]["GlyphIDs"][$counter] = ord(substr($tt, $tmp, 1)) * 256 + ord(substr($tt, $tmp + 1, 1));
					$tmp += 2;
				}

				for ($counter = 0; $counter < $nGlyphs; $counter++) {
					$TTfile["post"]["subtable"]["GlyphNames"][$counter] = substr($tt, $tmp + 1, ord(substr($tt, $tmp, 1)));
					$tmp += 1 + strlen($TTfile["post"]["subtable"]["GlyphNames"][$counter]);
				}
			}

			if ($TTfile["post"]["format"] = 2.5) {

				$tmp += 32;

				$nGlyphs = ord(substr($tt, $tmp, 1)) * 256 + ord(substr($tt, $tmp + 1, 1));
				$TTfile["post"]["subtable"]["nGlyphs"] = $nGlyphs;

				$tmp += 2;

				for ($counter = 0; $counter < $nGlyphs; $counter++) {
					$toff = ord(substr($tt, $tmp, 1));

					if ($toff > 127) {

						$toff = -($toff - 128);
					}

					$TTfile["post"]["subtable"]["offset"][$counter] = $toff;
					$tmp += 1;
				}

				for ($counter = 0; $counter < $nGlyphs; $counter++) {
					$TTfile["post"]["subtable"]["GlyphNames"][$counter] = substr($tt, $tmp + 1, ord(substr($tt, $tmp, 1)));
					$tmp += 1 + strlen($TTfile["post"]["subtable"]["GlyphNames"][$counter]);
#error_log($TTfile["post"]["subtable"]["GlyphNames"][$counter]);
				}
			}

/**
			$TTfile["post"]["count"] = ord(substr($tt, $tmp + 2, 1)) * 256 + ord(substr($tt, $tmp + 3, 1));
			$TTfile["post"]["stringOffset"] = ord(substr($tt, $tmp + 4, 1)) * 256 + ord(substr($tt, $tmp + 5, 1));

#error_log("--- listing post table ---");
#error_log("post tag format: " . $TTfile["post"]["format"]);
#error_log("post tag table count: " . $TTfile["post"]["count"]);
#error_log("post tag stringOffset: " . $TTfile["post"]["stringOffset"]);

			for ($counter = 0; $counter < $TTfile["post"]["count"]; $counter++) {
				$tmpa = $tmp + 6 + $counter * 12;

				$TTfile["post"]["records"][$counter]["platformID"] = ord(substr($tt, $tmpa, 1)) * 256 + ord(substr($tt, $tmpa + 1, 1)); 
				$TTfile["post"]["records"][$counter]["platformSpecificID"] = ord(substr($tt, $tmpa + 2, 1)) * 256 + ord(substr($tt, $tmpa + 3, 1));
				$TTfile["post"]["records"][$counter]["languageID"] = ord(substr($tt, $tmpa + 4, 1)) * 256 + ord(substr($tt, $tmpa + 5, 1));
				$TTfile["post"]["records"][$counter]["nameID"] =ord(substr($tt, $tmpa + 6, 1)) * 256 + ord(substr($tt, $tmpa + 7, 1));
				$TTfile["post"]["records"][$counter]["length"] =ord(substr($tt, $tmpa + 8, 1)) * 256 + ord(substr($tt, $tmpa + 9, 1));
				$TTfile["post"]["records"][$counter]["offset"] =ord(substr($tt, $tmpa + 10, 1)) * 256 + ord(substr($tt, $tmpa + 11, 1));
				$TTfile["post"]["records"]["namestring"][$counter] = substr($tt, $tmp + $TTfile["name"]["records"][$counter]["offset"], $TTfile["name"]["records"][$counter]["length"]);

			}
**/
		} else {

			$this->FMError("parseTrueTypefile: no post table... cannot create proper TrueType to PostScript table");

		}



		if (in_array("glyf", $TTfile)) {

#error_log("Found glyf table");

		} else {

			$this->FMError("parseTrueTypefile: no glyph table... cannot create glyph outlines");
		}

	}

	function packSOUNDINFO($SyncFlags, $HasEnvelope, $HasLoops, $HasOutPoint, $HasInPoint, $InPoint, $OutPoint, $LoopCount, $nEnvelopePoints, $Envelope) 
	{
		array_push($this->FMDebug, "packSOUNDINFO");

		$SOUNDINFO  = $this->packnBits($SyncFlags, 4);
		$SOUNDINFO .= $HasEnvelope;
		$SOUNDINFO .= $HasLoops;
		$SOUNDINFO .= $HasOutPoint;
		$SOUNDINFO .= $HasInPoint;

		$SOUNDINFO  = $this->packBitValues($SOUNDINFO);

		if ($HasInPoint) {

			$SOUNDINFO .= $this->packUI32($InPoint);
		}

		if ($HasOutPoint) {

			$SOUNDINFO .= $this->packUI32($OutPoint);
		}

		if ($HasLoops) {

			$SOUNDINFO .= $this->packUI16($LoopCount);
		}

		if ($HasEnvelope) {

			$SOUNDINFO .= $this->packUI8($nEnvelopePoints);
			$SOUNDINFO .= $Envelope;
		}

		array_pop($this->FMDebug);

		return $SOUNDINFO;
	}

	function packSOUNDENVELOPE($Mark44, $Level0, $Level1)
	{
		array_push($this->FMDebug, "packSOUNDENVELOPE");

		$SOUNDENVELOPE  = $this->packUI32($Mark44);
		$SOUNDENVELOPE .= $this->packUI16($Level0);
		$SOUNDENVELOPE .= $this->packUI16($Level1);

		array_pop($this->FMDebug);

		return $SOUNDENVELOPE;
	}

	function packADPCMSOUNDDATA()
	{

	}

	function packADPCMPACKET16STEREO()
	{

	}

	function packADPCMCODEDATA()
	{

	}

	function packMP3FRAME()
	{

	}

	function packMP3SOUNDDATA()
	{

	}

	function packMP3STREAMSOUNDDATA()
	{

	}

	function packACTIONRECORD()
	{

	}

	function packActionGotoFrame($Frame)
	{
		array_push($this->FMDebug, "packActionGotoFrame");

		$ActionID = $this->packUI8(0x81);
		$ActionLength = $this->packUI16(2);
		$Frame = $this->packUI16($Frame);
		$ActionGotoFrame = $ActionID . $ActionLength . $Frame;

		array_pop($this->FMDebug);

		return $ActionGotoFrame;
	}

	function packActionGetURL($URLString, $TargetString)
	{
		array_push($this->FMDebug, "packActionGetURL");

		$ActionID = $this->packUI8(0x83);
		$URLString = $this->packSTRING($URLString);
		$TargetString = $this->packSTRING($TargetString);
		$ActionLength = $this->packUI16(strlen($URLString . $TargetString));
		$ActionGetURL = $ActionID . $ActionLength . $URLString . $TargetString;

		array_pop($this->FMDebug);

		return $ActionGetURL;
	}

	function packActionNextFrame()
	{
		array_push($this->FMDebug, "packActionNextFrame");

		$ActionID = $this->packUI8(0x04);
		$ActionNextFrame = $ActionID;

		array_pop($this->FMDebug);

		return $ActionNextFrame;
	}

	function packActionPreviousFrame()
	{
		array_push($this->FMDebug, "packActionPreviousFrame");

		$ActionID = $this->packUI8(0x05);
		$ActionPrevFrame = $ActionID;

		array_pop($this->FMDebug);

		return $ActionPrevFrame;
	}

	function packActionPlay()
	{
		array_push($this->FMDebug, "packActionPlay");

		$ActionID = $this->packUI8(0x06);
		$ActionPlay = $ActionID;

		array_pop($this->FMDebug);

		return $ActionPlay;
	}

	function packActionStop()
	{
		array_push($this->FMDebug, "packActionStop");

		$ActionID = $this->packUI8(0x07);
		$ActionStop = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStop;

	}

	function packActionToggleQuality()
	{
		array_push($this->FMDebug, "packActionToggleQuality");

		$ActionID = $this->packUI8(0x08);
		$ActionToggleQuality = $ActionID;

		array_pop($this->FMDebug);

		return $ActionToggleQuality;
	}

	function packActionStopSounds()
	{
		array_push($this->FMDebug, "packActionStopSounds");

		$ActionID = $this->packUI8(0x09);
		$ActionStopSounds = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStopSounds;
	}

	function packActionWaitForFrame($Frame, $SkipCount)
	{
		array_push($this->FMDebug, "packActionWaitForFrame");

		$ActionID = $this->packUI8(0x8A);
		$ActionLength = $this->packUI16(3);
		$Frame = $this->packUI16($Frame);
		$SkipCount = $this->packUI8($SkipCount);
		$ActionWaitForFrame = $ActionID . $ActionLength . $Frame . $SkipCount;

		array_pop($this->FMDebug);

		return $ActionWaitForFrame;
	}

	function packActionSetTarget($Target)
	{
		array_push($this->FMDebug, "packActionSetTarget");

		$ActionID = $this->packUI8(0x8B);
		$Target = $this->packSTRING($Target);
		$ActionLength = $this->packUI16($Target);
		$ActionSetTarget = $ActionID . $ActionLength . $Target;

		array_pop($this->FMDebug);

		return $ActionSetTarget;
	}

	function packActionGoToLabel($Label)
	{
		array_push($this->FMDebug, "packActionGotoLabel");

		$ActionID = $this->packUI8(0x8B);
		$Label = $this->packSTRING($Label);
		$ActionLength = $this->packUI16($Label);
		$ActionGotoLabel = $ActionID . $ActionLength . $Label;

		array_pop($this->FMDebug);

		return $ActionGotoLabel;
	}

	function packActionPush($Type, $Value)
	{
		array_push($this->FMDebug, "packActionPush");

		$ActionID = $this->packUI8(0x96);

		if ($Type == 0) {

			$Type = $this->packUI8($Type);
			$Value = $this->packSTRING($Value);

		} elseif ($Type == 1) {

			$Type = $this->packUI8($Type);
			$Value = $this->packFLOAT($Value);
		}

		$ActionPush = $ActionID . $Type . $Value;

		array_pop($this->FMDebug);

		return $ActionPush;
	}

	function packActionPop()
	{
		array_push($this->FMDebug, "packActionPop");

		$ActionID = $this->packUI8(0x17);

		$ActionPop = $ActionID;

		array_pop($this->FMDebug);

		return $ActionPop;
	}

	function packActionAdd()
	{
		array_push($this->FMDebug, "packActionAdd");

		$ActionID = $this->packUI8(0x0A);

		$ActionAdd = $ActionID;

		array_pop($this->FMDebug);

		return $ActionAdd;
	}

	function packActionSubtract()
	{
		array_push($this->FMDebug, "packActionSubtract");

		$ActionID = $this->packUI8(0x0B);

		$ActionSubtract = $ActionID;

		array_pop($this->FMDebug);

		return $ActionSubtract;
	}

	function packActionMultiply()
	{
		array_push($this->FMDebug, "packActionMultiply");

		$ActionID = $this->packUI8(0x0C);

		$ActionMultiply = $ActionID;

		array_pop($this->FMDebug);

		return $ActionMultiply;
	}

	function packActionDivide()
	{
		array_push($this->FMDebug, "packActionDivide");

		$ActionID = $this->packUI8(0x0D);

		$ActionDivide = $ActionID;

		array_pop($this->FMDebug);

		return $ActionDivide;
	}

	function packActionEquals()
	{
		array_push($this->FMDebug, "packActionEquals");

		$ActionID = $this->packUI8(0x0E);

		$ActionEquals = $ActionID;

		array_pop($this->FMDebug);

		return $ActionEquals;
	}

	function packActionLess()
	{
		array_push($this->FMDebug, "packActionLess");

		$ActionID = $this->packUI8(0x0F);

		$ActionLess = $ActionID;

		array_pop($this->FMDebug);

		return $ActionLess;
	}

	function packActionAnd()
	{
		array_push($this->FMDebug, "packActionAnd");

		$ActionID = $this->packUI8(0x10);

		$ActionAnd = $ActionID;

		array_pop($this->FMDebug);

		return $ActionAnd;
	}

	function packActionOr()
	{
		array_push($this->FMDebug, "packActionOr");

		$ActionID = $this->packUI8(0x11);

		$ActionOr = $ActionID;

		array_pop($this->FMDebug);

		return $ActionOr;
	}

	function packActionNot()
	{
		array_push($this->FMDebug, "packActionNot");

		$ActionID = $this->packUI8(0x12);

		$ActionNot = $ActionID;

		array_pop($this->FMDebug);

		return $ActionNot;
	}

	function packActionStringEquals()
	{
		array_push($this->FMDebug, "packActionStringEquals");

		$ActionID = $this->packUI8(0x13);

		$ActionStringEquals = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringEquals;
	}

	function packActionStringLength()
	{
		array_push($this->FMDebug, "packActionStringLength");

		$ActionID = $this->packUI8(0x14);

		$ActionStringLength = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringLength;
	}

	function packActionStringAdd()
	{
		array_push($this->FMDebug, "packActionStringAdd");

		$ActionID = $this->packUI8(0x21);

		$ActionStringAdd = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringAdd;
	}

	function packActionStringExtract()
	{
		array_push($this->FMDebug, "packActionStringExtract");

		$ActionID = $this->packUI8(0x15);

		$ActionStringExtract = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringExtract;
	}

	function packActionStringLess()
	{
		array_push($this->FMDebug, "packActionStringLess");

		$ActionID = $this->packUI8(0x29);

		$ActionStringLess = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringLess;
	}

	function packActionMBStringLength()
	{
		array_push($this->FMDebug, "packActionMBStringLength");

		$ActionID = $this->packUI8(0x31);

		$ActionStringLength = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringLength;
	}

	function packActionMBStringExtract()
	{
		array_push($this->FMDebug, "packActionMBStringExtract");

		$ActionID = $this->packUI8(0x35);

		$ActionStringExtract = $ActionID;

		array_pop($this->FMDebug);

		return $ActionStringExtract;
	}

	function packActionToInteger()
	{
		array_push($this->FMDebug, "packActionToInteger");

		$ActionID = $this->packUI8(0x18);

		$ActionToInteger = $ActionID;

		array_pop($this->FMDebug);

		return $ActionToInteger;
	}

	function packActionCharToAscii()
	{
		array_push($this->FMDebug, "packActionCharToASCII");

		$ActionID = $this->packUI8(0x32);

		$ActionCharToASCII = $ActionID;

		array_pop($this->FMDebug);

		return $ActionCharToASCII;
	}

	function packActionAsciiToChar()
	{
		array_push($this->FMDebug, "packActionASCIIToChar");

		$ActionID = $this->packUI8(0x33);

		$ActionASCIIToChar = $ActionID;

		array_pop($this->FMDebug);

		return $ActionASCIIToChar;
	}

	function packActionMBCharToAscii()
	{
		array_push($this->FMDebug, "packActionMBCharToASCII");

		$ActionID = $this->packUI8(0x36);

		$ActionMBCharToASCII = $ActionID;

		array_pop($this->FMDebug);

		return $ActionMBCharToASCII;
	}

	function packActionMBAsciiToChar()
	{
		array_push($this->FMDebug, "packActionMBASCIIToChar");

		$ActionID = $this->packUI8(0x37);

		$ActionMBASCIIToChar = $ActionID;

		array_pop($this->FMDebug);

		return $ActionMBASCIIToChar;
	}

	function packActionJump($Offset)
	{
		array_push($this->FMDebug, "packActionJump");

		$ActionID = $this->packUI8(0x99);

		$Offset = $this->packSI16($Offset);

		$ActionJump = $ActionID . $Offset;

		array_pop($this->FMDebug);

		return $ActionJump;
	}

	function packActionIf()
	{
		array_push($this->FMDebug, "packActionIf");

		$ActionID = $this->packUI8(0x9A);

		$Offset = $this->packSI16($Offset);

		$ActionIf = $ActionID . $Offset;

		array_pop($this->FMDebug);

		return $ActionIf;
	}

	function packActionCall()
	{
		array_push($this->FMDebug, "packActionCall");

		$ActionID = $this->packUI8(0x37);

		$ActionCall = $ActionID;

		array_pop($this->FMDebug);

		return $ActionCall;
	}

	function packActionGetVariables()
	{
	}

	function packActionSetVariables()
	{
	}

	function packActionGetURL2()
	{
	}

	function packActionGotoFrame2()
	{
	}

	function packActionSetTarget2()
	{
	}

	function packActionGetProperty()
	{
	}

	function packActionSetProperty()
	{
	}

	function packActionCloneSprite()
	{
	}

	function packActionRemoveSprite()
	{
	}

	function packActionStartDrag()
	{
	}

	function packActionEndDrag()
	{
	}

	function packWaitForFrame2()
	{
	}

	function packActionTrace()
	{
	}

	function packActionGetTime()
	{
	}

	function packActionRandomNumber()
	{
	}

	function packActionCallFunction()
	{
	}

	function packActionCallMethod()
	{
	}

	function packActionConstantPool()
	{
	}

	function packActionDefineFunction()
	{
	}

	function packActionDefineLocal()
	{
	}

	function packActionDefineLocal2()
	{
	}

	function packActionDelete()
	{
	}

	function packActionDelete2()
	{
	}

	function packActionEnumerate()
	{
	}

	function packActionEquals2()
	{
	}

	function packActionGetMember()
	{
	}

	function packActionInitArray()
	{
	}

	function packActionInitObject()
	{
	}

	function packActionNewMethod()
	{
	}

	function packActionNewObject()
	{
	}

	function packActionSetMember()
	{
	}

	function packActionTargetPath()
	{
	}

	function packActionWith()
	{
	}

	function packActionToNumber()
	{
	}

	function packActionToString()
	{
	}

	function packActionTypeOf()
	{
	}

	function packActionAdd2()
	{
	}

	function packActionLess2()
	{
	}

	function packActionModulo()
	{
	}

	function packActionBitAnd()
	{
	}

	function packActionBitLShift()
	{
	}

	function packActionBitOr()
	{
	}

	function packActionBitRShift()
	{
	}

	function packActionBitURShift()
	{
	}

	function packActionBitXor()
	{
	}

	function packActionDecrement()
	{
	}

	function packActionIncrement()
	{
	}

	function packActionPushDuplicate()
	{
	}

	function packActionReturn()
	{
	}

	function packActionStackSwap()
	{
	}

	function packActionStoreRegister()
	{
	}

	function packBUTTONRECORD()
	{
	}

	function packDefineButtonxform()
	{
	}

	function packDefineButtonSound()
	{
	}


	//------------------------------------------------//
	//                                                //
	//                      Tags                      //
	//                                                //
	//------------------------------------------------//

	//--------------------------------------------------
	//  null AutoSetSWFVersion(integer version)
	//  sets the SWF file version number to version.
	//  NOTE: don't call this function directly.  Use 
	//        SetSWFVersion() from the Toolbox instead. 

	function AutoSetSWFVersion($version)
	{
		array_push($this->FMDebug, "AutoSetSWFVersion");

		if ($this->SWFVersion < $version) {

			$this->SWFVersion = (int) $version;
		}

		array_pop($this->FMDebug);
	} 

	//--------------------------------------------------
	//  string packRECORDHEADER(integer TagID, 
	//                               integer TagLength)
	//  returns the SWF RECORDHEADER string.

	function packRECORDHEADER($TagID, $TagLength)
	{
		array_push($this->FMDebug, "packRECORDHEADER");

		$lower_limit = 0;
		$upper_short_tag_limit = 62;
		$upper_long_tag_limit = 2147483647;

        	if (!(is_integer($TagLength))) {

                	$this->FMError("packRECORDHEADER argument (TagLength) not an integer");
        	}

        	if ($TagLength < $lower_limit) {

                	$this->FMError("packRECORDHEADER argument (TagLength) negative");
        	}

        	if ($TagLength > $upper_short_tag_limit) {

			if ($TagLength > $upper_long_tag_limit) {

                		$this->FMError("packRECORDHEADER argument (TagLength) out of range");
			} else {

				$atom  = $TagID << 6;
				$atom += 0x3f;
				$atom  = $this->packUI16($atom);
				$atom .= $this->packUI32($TagLength);
			}
        	} else {

			$atom  = $TagID << 6;
			$atom += $TagLength;
			$atom  = $this->packUI16($atom);
		}

		array_pop($this->FMDebug);

		return $atom;
	}

	//--------------------------------------------------
	//  string packEndTag()
	//  returns an SWF End Tag string.
	//  TagID: 0 

	function packEndTag()
	{
		array_push($this->FMDebug, "packEndTag");

		$TagID = 0;
		$TagLength = 0;

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packShowFrameTag() 
	//  returns an SWF ShowFrameTag string.
	//  TagID: 1 

	function packShowFrameTag()
	{
		array_push($this->FMDebug, "packShowFrameTag");

		$TagID = 1;
		$TagLength = 0;

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength);

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  null packDefineShapeTag(integer ShapeID, 
	//        string ShapeBounds, string SHAPEWITHSTYLE) 
	//  returns an SWF DefineShapeTag string.
	//  TagID: 2 

	function packDefineShapeTag($ShapeID, $ShapeBounds, $SHAPEWITHSTYLE)
	{
		array_push($this->FMDebug, "packDefineShapeTag");
		$TagID = 2;

		$DefineShapeTag = $this->packUI16($ShapeID) . $ShapeBounds . $SHAPEWITHSTYLE;

		$TagLength = strlen($DefineShapeTag);

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $DefineShapeTag;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packPlaceObjectTag(integer CharacterID,
	//      integer Depth, string MATRIX, string CXFORM) 
	//  return an SWF PlaceObject tag string.
	//  TagID: 4

	function packPlaceObjectTag($CharacterID, $Depth, $MATRIX, $CXFORM)
	{
		array_push($this->FMDebug, "packPlaceObjectTag");

		$TagID = 4;

		$CharacterID = $this->packUI16($CharacterID);
		$Depth = $this->packUI16($Depth);
		$TagLength = strlen($CharacterID . $Depth . $MATRIX . $CXFORM);
	
		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $CharacterID . $Depth . $MATRIX . $CXFORM;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packRemoveObjectTag(integer CharacterID,
	//                                    integer Depth)
	//  returns an SWF RemoveObject tag string.
	//  TagID: 5 

	function packRemoveObjectTag($CharacterID, $Depth)
	{
		array_push($this->FMDebug, "packRemoveObjectTag");
#error_log($CharacterID);
		$TagID = 5;

		$CharacterID = $this->packUI16($CharacterID);
		$Depth = $this->packUI16((int)$Depth);

		$TagLength = strlen($CharacterID . $Depth);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $CharacterID . $Depth;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packDefineBitsTag(integer BitmapID, 
	//                           string BitmapJPEGImage)
	//  return an SWF DefineBits tag string.
	//  TagID: 6

	function packDefineBitsTag($CharacterID, $BitmapJPEGImage)
	{
		array_push($this->FMDebug, "packDefineBitsTag");

		$TagID = 6;
		$BitmapID = $this->packUI16($CharacterID);
		$TagLength = strlen($BitmapID . $BitmapJPEGImage);
		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $BitmapID . $BitmapJPEGImage;

		array_pop($this->FMDebug);
	}

	function packDefineButtonTag()
	{
		array_push($this->FMDebug, "packDefineButtonTag");
		array_pop($this->FMDebug);
	}

	function packDefineButton2Tag()
	{
		array_push($this->FMDebug, "packDefineButton2Tag");
		array_pop($this->FMDebug);

	}

	//--------------------------------------------------
	//  string packJPEGTablesTag(
 	//                        string BitmapJPEGEncoding)
	//  returns an SWF JPEGTablesTag string.
	//  TagID: 8 

	function packJPEGTablesTag($BitmapJPEGEncoding)
	{
		array_push($this->FMDebug, "packJPEGTablesTag");

		$TagID = 8;
		$TagLength = strlen($BitmapJPEGEncoding);

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $BitmapJPEGEncoding;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packSetBackgroundColorTag(integer R, 
	//                             integer G, integer B)
	//  return an SWF SetBackgroundColorTag string.
	//  TagID: 9

	function packSetBackgroundColorTag($R, $G, $B)
	{
		array_push($this->FMDebug, "packSetBackgroundColorTag");

		$TagID = 9;
		$RGB = $this->packRGB($R, $G, $B);
		$TagLength = strlen($RGB);

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $RGB;

		array_pop($this->FMDebug);
	}

	function packDoActionTag()
	{
		array_push($this->FMDebug, "packDoActionTag");
		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packDefineSoundTag(integer CharacterID, 
	//          integer SoundFormat, integer SoundRate,
	//            integer SoundSize, integer SoundType, 
	//       integer SoundSampleCount, string SoundFile)
	//  returns an SWFDefineSoundTag string.
	//  TagID: 14 

	function packDefineSoundTag($CharacterID, $SoundFormat, $SoundRate, $SoundSize, $SoundType, $SoundSampleCount, $SoundFile)
	{
		array_push($this->FMDebug, "packDefineSoundTag");
#error_log("here--");
		$TagID = 14;

		$DefineSoundTag  = $this->packnBits($SoundFormat, 4);
		$DefineSoundTag .= $this->packnBits($SoundRate, 2);
		$DefineSoundTag .= $this->packnBits($SoundSize, 1);
		$DefineSoundTag .= $this->packnBits($SoundType, 1);

		$DefineSoundTag  = $this->packBitValues($DefineSoundTag);
	
		$DefineSoundTag  = $this->packUI16($CharacterID) . $DefineSoundTag;
		$DefineSoundTag .= $this->packUI32($SoundSampleCount);

		$file_handle = fopen($SoundFile, "r");
		$file = fread($file_handle, filesize($SoundFile));
		fclose($file_handle);

		if ($SoundFormat == 2) {

			$DefineSoundTag .= $this->packUI16(10) . $file;
		}	
		
		$TagLength = strlen($DefineSoundTag);

		$this->AutoSetSWFVersion(1);

		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $DefineSoundTag;

		array_pop($this->FMDebug);

	}

	//--------------------------------------------------
	//  string packStartSoundTag(integer CharacterID, 
	//                                string SOUNDINFO)
	//  returns an SWFDefineSoundTag string.
	//  TagID: 15 

	function packStartSoundTag($CharacterID, $SOUNDINFO)
	{
		array_push($this->FMDebug, "packStartSoundTag");

		$TagID = 15;

		$StartSoundTag = $this->packUI16($CharacterID) . $SOUNDINFO;

		$TagLength = strlen($StartSoundTag);

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $StartSoundTag;

		array_pop($this->FMDebug);

	}

	function packSoundStreadmingHeadTag()
	{
		array_push($this->FMDebug, "packSoundStreamingHeadTag");
		array_pop($this->FMDebug);

	}

	function packSoundStreamingHead2Tag()
	{
		array_push($this->FMDebug, "packSoundStreamingHead2Tag");
		array_pop($this->FMDebug);

	}

	function packSoundStreamBlockTag()
	{
		array_push($this->FMDebug, "packSoundStreamBlockTag");
		array_pop($this->FMDebug);

	}

	//--------------------------------------------------
	//  string packDefineBitsLosslessTag(
	//              integer BitmapID, integer BitmapID,
	//       integer BitmapFormat, integer BitmapWidth,
	//                            integer BitmapHeight, 
	//                    integer BitmapColorTableSize,
	//                            string ZlibBitmapData)
	//  return an SWF DefineBitsLossless tag string.
	//  TagID: 20 

	function packDefineBitsLosslessTag($BitmapID, $BitmapFormat, $BitmapWidth, $BitmapHeight, $BitmapColorTableSize, $ZlibBitmapData)
	{
		array_push($this->FMDebug, "packDefineBitsLosslessTag");

		$TagID = 20;

		$BitmapID = $this->packUI16($BitmapID);
		$BitmapWidth = $this->packUI16($BitmapWidth);
		$BitmapHeight = $this->packUI16($BitmapHeight);
	
		switch ($BitmapFormat) {

			case 3:

				$BitmapColorTableSize = $this->packUI8($BitmapColorTableSize); 
				break;
	
			case 4:

				$BitmapColorTableSize = $this->packUI16($BitmapColorTableSize); 
				break;

			case 5:

				$BitmapColorTableSize = $this->packUI32($BitmapColorTableSize); 
				break;

			default:

				$this->FMError("packDefineBitsLosslessTag illegal argument (BitmapFormat)");
		}

		$BitmapFormat = $this->packUI8($BitmapFormat);

		$TagLength = strlen($BitmapID . $BitmapFormat . $BitmapWidth . $BitmapHeight . $BitmapColorTableSize . $ZlibBitmapData);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $BitmapID . $BitmapFormat . $BitmapWidth . $BitmapHeight . $BitmapColorTableSize . $ZlibBitmapData;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packDefineBitsJPEG2Tag(integer BitmapID, 
	//                       string BitmapJPEGEncoding,
	//                           string BitmapJPEGImage)
	//  return an SWF DefineBitsJPEG2 tag string.
	//  TagID: 21 

	function packDefineBitsJPEG2Tag($BitmapID, $BitmapJPEGEncoding, $BitmapJPEGImage)
	{
		array_push($this->FMDebug, "packDefineBitsJPEG2Tag");

		$TagID = 21;

		$BitmapID = $this->packUI16($BitmapID);

		$TagLength = strlen($BitmapID . $BitmapJPEGEncoding . $BitmapJPEGImage);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $BitmapID . $BitmapJPEGEncoding . $BitmapJPEGImage;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  null packDefineShapeTag2(integer ShapeID, 
	//        string ShapeBounds, string SHAPEWITHSTYLE) 
	//  returns an SWF DefineShapeTag string.
	//  TagID: 22 

	function packDefineShape2Tag($ShapeID, $ShapeBounds, $SHAPEWITHSTYLE)
	{
		array_push($this->FMDebug, "packDefineShape2Tag");

		$TagID = 22;

		$DefineShapeTag = $this->packUI16($ShapeID) . $ShapeBounds . $SHAPEWITHSTYLE;

		$TagLength = strlen($DefineShapeTag);

		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $DefineShapeTag;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packProtectTag(string Password)
	//  returns an SWF Protect tag string.
	//  TagID: 24

	function packProtectTag($Password)
	{
		array_push($this->FMDebug, "packProtectTag");

		$TagID = 24;

		if (!($Password == "")) {

			$Password = $this->packSTRING(bin2hex(mhash(MHASH_MD5, $Password)));
		}

		$TagLength = strlen($Password);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $Label;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packPlaceObject2Tag(integer CharacterID,
	//     integer Depth, string MATRIX, string CXFORM,
	//     string MATRIX, string CXFORM, integer Ratio,
	//                  string Name, string ClipActions) 
	//  return an SWF PlaceObject2 tag string.
	//  TagID: 26 

	function packPlaceObject2Tag($PlaceFlagMove, $PlaceFlagHasCharacter, $CharacterID, $Depth, $MATRIX, $CXFORM, $Ratio, $Name, $ClipActions)
	{
		array_push($this->FMDebug, "packPlaceObject2Tag");

		$TagID = 26;

		$PlaceFlagHasClipActions = "0";
		$PlaceFlagReserved = "0";
		$PlaceFlagHasName = "0";
		$PlaceFlagHasRatio = "0";
		$PlaceFlagHasColorTransform = "0";
		$PlaceFlagHasMatrix = "0";

		$payload = "";

		if ($PlaceFlagMove) {

			$PlaceFlagMove = "1";

		} else {

			$PlaceFlagMove = "0";
		}


		if (($PlaceFlagHasCharacter) and ($CharacterID != null)) {

			$PlaceFlagHasCharacter = "1";
			$payload .= $this->packUI16($CharacterID);

		} else {

			$PlaceFlagHasCharacter = "0";
		}

		if (!($MATRIX == "")) {

			$PlaceFlagHasMatrix = "1";
			$payload .= $MATRIX;
		}

		if (!($CXFORM == "")) {

			$PlaceFlagHasColorTransform = "1";
			$payload .= $CXFORM;
		}

		if (!($Ratio == NULL)) {

			$PlaceFlagHasRatio = "1";
			$payload .= $this->packUI16($Ratio);
		}

		if (!($Name == NULL)) {

			$PlaceFlagHasName = "1";
			$payload .= $this->packSTRING($Name);
		}

		if (!($ClipActions == NULL)) {

			$PlaceFlagHasClipActions = "1";
			$payload .= $ClipActions;
		}

		$PlaceFlags = $PlaceFlagHasClipActions . $PlaceFlagReserved . $PlaceFlagHasName . $PlaceFlagHasRatio . $PlaceFlagHasColorTransform . $PlaceFlagHasMatrix . $PlaceFlagHasCharacter . $PlaceFlagMove;

		$payload  = $this->packBitValues($PlaceFlags) . $this->packUI16($Depth). $payload;

		$TagLength = strlen($payload);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $payload;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packRemoveObject2Tag(integer Depth)
	//  returns an SWF RemoveObject2 tag string.
	//  TagID: 28 

	function packRemoveObject2Tag($Depth)
	{
		array_push($this->FMDebug, "packRemoveObject2Tag");

		$TagID = 28;

		$Depth = $this->packUI16($Depth);

		$TagLength = strlen($Depth);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $Depth;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  null packDefineShapeTag3(integer ShapeID, 
	//        string ShapeBounds, string SHAPEWITHSTYLE) 
	//  returns an SWF DefineShapeTag string.
	//  TagID: 32 

	function packDefineShape3Tag($ShapeID, $ShapeBounds, $SHAPEWITHSTYLE)
	{
		array_push($this->FMDebug, "packDefineShape3Tag");

		$TagID = 32;

		$DefineShapeTag = $this->packUI16($ShapeID) . $ShapeBounds . $SHAPEWITHSTYLE;

		$TagLength = strlen($DefineShapeTag);

		$this->AutoSetSWFVersion(1);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $DefineShapeTag;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packDefineBitsJPEG3Tag(integer BitmapID, 
	//                       string BitmapJPEGEncoding, 
	//   string BitmapJPEGImage, string BitmapAlphaData)
	//  return an SWF DefineBitsJPEG3 tag string.
	//  TagID: 35 

	function packDefineBitsJPEG3Tag($BitmapID, $BitmapJPEGEncoding, $BitmapJPEGImage, $BitmapAlphaData)
	{
		array_push($this->FMDebug, "packDefineBitsJPEG3Tag");

		$TagID = 35;
		$BitmapID = $this->packUI16($BitmapID);
		$Offset = $this->packUI32(strlen($BitmapJPEGEncoding . $BitmapJPEGImage));
		$TagLength = strlen($BitmapID . $Offset . $BitmapJPEGEncoding . $BitmapJPEGImage . $BitmapAlphaData);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $BitmapID . $Offset . $BitmapJPEGEncoding . $BitmapJPEGImage . $BitmapAlphaData;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packDefineBitsLossless2Tag(
	//              integer BitmapID, integer BitmapID,
	//       integer BitmapFormat, integer BitmapWidth,
	//                            integer BitmapHeight, 
	//                    integer BitmapColorTableSize,
	//                            string ZlibBitmapData)
	//  return an SWF DefineBitsLossless2 tag string.
	//  TagID: 36 

	function packDefineBitsLossless2Tag($BitmapID, $BitmapFormat, $BitmapWidth, $BitmapHeight, $BitmapColorTableSize, $ZlibBitmapData2)
	{
		array_push($this->FMDebug, "packDefineBitsLossless2Tag");

		$TagID = 36;

		$BitmapID = $this->packUI16($BitmapID);
		$BitmapWidth = $this->packUI16($BitmapWidth);
		$BitmapHeight = $this->packUI16($BitmapHeight);
	
		switch ($BitmapFormat) {

			case 3:

				$BitmapColorTableSize = $this->packUI8($BitmapColorTableSize); 
				break;
	
			case 4:

				$BitmapColorTableSize = $this->packUI16($BitmapColorTableSize); 
				break;

			case 5:

				$BitmapColorTableSize = $this->packUI32($BitmapColorTableSize); 
				break;

			default:

				$this->FMError("packDefineBitsLosslessTag illegal argument (BitmapFormat)");
		}

		$BitmapFormat = $this->packUI8($BitmapFormat);

		$TagLength = strlen($BitmapID . $BitmapFormat . $BitmapWidth . $BitmapHeight . $BitmapColorTableSize . $ZlibBitmapData2);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $BitmapID . $BitmapFormat . $BitmapWidth . $BitmapHeight . $BitmapColorTableSize . $ZlibBitmapData2;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packFrameLabelTag(string Label)
	//  returns an SWF FrameLabel tag string.
	//  TagID: 43

	function packFrameLabelTag($Label)
	{
		array_push($this->FMDebug, "packFrameLabelTag");

		$TagID = 43;
		$Label = $this->packSTRING($Label);
		$TagLength = strlen($Label);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $Label;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  null packDefineMorphShapeTag(integer ShapeID, 
	//     string FromShapeBounds, stringToShapeBounds,
	//                          string MorphFillStyles,
	//        string MorphLineStyles, string FromShape,
	//                                   string ToShape) 
	//  returns an SWF DefineMorphShapeTag string.
	//  TagID: 46 

	function packDefineMorphShapeTag($ShapeID, $FromShapeBounds, $ToShapeBounds, $MorphFillStyles, $MorphLineStyles, $FromShape, $ToShape)
	{
		array_push($this->FMDebug, "packDefineMorphShapeTag");
		$TagID = 46;

		$DefineMorphShapeTag = $this->packUI16($ShapeID) . $FromShapeBounds . $ToShapeBounds . $this->packUI32(strlen($MorphFillStyles . $MorphLineStyles . $FromShape)) . $MorphFillStyles . $MorphLineStyles . $FromShape . $ToShape;

		$TagLength = strlen($DefineMorphShapeTag);

		$this->AutoSetSWFVersion(5);
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $DefineMorphShapeTag;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packExportAssetsTag(string AssetList)
	//  returns an SWF EnableDebugger tag string.
	//  TagID: 56

	function packExportAssetsTag($AssetList)
	{
		array_push($this->FMDebug, "packExportAssetsTag");

		$TagID = 56;

		$AssetCount = substr_count($AssetList, chr(0));

		$TagLength = strlen($AssetCount . $AssetList);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $AssetCount . $AssetList;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packImportAssetsTag(string URL,
	//                                 string AssetList)
	//  returns an SWF EnableDebugger tag string.
	//  TagID: 57

	function packImportAssetsTag($URL, $AssetList)
	{
		array_push($this->FMDebug, "packImportAssetsTag");

		$TagID = 57;

		$URL = $this->packSTRING($URL);

		$AssetCount = substr_count($AssetList, chr(0)) - 1;

		$TagLength = strlen($URL, $AssetCount . $AssetList);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $URL . $AssetCount . $AssetList;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packEnableDebuggerTag(string Password)
	//  returns an SWF EnableDebugger tag string.
	//  TagID: 58

	function packtectEnableDebuggerTag($Password)
	{
		array_push($this->FMDebug, "packEnableDebuggerTag");

		$TagID = 58;

		if (!($Password == "")) {

			$Password = $this->packSTRING(bin2hex(mhash(MHASH_MD5, $Password)));
		}

		$TagLength = strlen($Password);
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $Label;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packDefineBitsPtrTag(integer Pointer)
	//  returns an SWF DefineBitsPtr tag string.
	//  TagID:1023 

	function packDefineBitsPtrTag($Pointer)
	{
		array_push($this->FMDebug, "packDefineBitsPtrTag");

		$TagID = 1023;

		$TagLength = strlen($this->packUI32($Pointer));
	
		$this->MovieData .= $this->packRECORDHEADER($TagID, $TagLength) . $Label;

		array_pop($this->FMDebug);
	}

	//--------------------------------------------------
	//  string packMacromediaFlashSWFHeader()
	//  returns the Macromedia Flash SWF Header string.

	function packMacromediaFlashSWFHeader()
	{
		array_push($this->FMDebug, "packMacromediaFlashSWFHeader");

		$HeaderLength = 21;
		$atom  = "FWS";
		$atom .= $this->packUI8((int)$this->SWFVersion);
		$atom .= $this->packUI32($HeaderLength + strlen($this->MovieData));

		$Xmin = (int)$this->FrameSize["Xmin"]; 
		$Xmax = (int)$this->FrameSize["Xmax"]; 
		$Ymin = (int)$this->FrameSize["Ymin"]; 
		$Ymax = (int)$this->FrameSize["Ymax"];

		if (min($Xmax, $Ymax) < 360) {

			$this->FMError("packMacromediaFlashSWFHeader movie frame too small");

		}

		if (max($Xmax, $Ymax) > 57600) {

			$this->FMError("packMacromediaFlashSWFHeader movie frame too large");

		}

		$Xmin = $this->packUBchunk($Xmin); 
		$Xmax = $this->packUBchunk($Xmax); 
		$Ymin = $this->packUBchunk($Ymin); 
		$Ymax = $this->packUBchunk($Ymax);

		$nBits = 16;

		$Xmin = str_repeat("0", ($nBits - strlen($Xmin))) . $Xmin;
		$Xmax = str_repeat("0", ($nBits - strlen($Xmax))) . $Xmax;
		$Ymin = str_repeat("0", ($nBits - strlen($Ymin))) . $Ymin;
		$Ymax = str_repeat("0", ($nBits - strlen($Ymax))) . $Ymax;

		$RECT = $this->packnBits($nBits, 5) . $Xmin . $Xmax . $Ymin . $Ymax;

		$atom .= $this->packBitValues($RECT);
		$atom .= $this->packFIXED8((float)$this->FrameRate);
		$atom .= $this->packUI16((int)$this->FrameCounter);

		$this->MovieData = $atom . $this->MovieData;

		array_pop($this->FMDebug);
	}

}
?>
