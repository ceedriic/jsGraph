/* !
* Graphing JavaScript Library v0.2.0
* https://github.com/NPellet/graph
* 
* Copyright (c) 2014 Norman Pellet
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in
* all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
* THE SOFTWARE.
* 
* Date: 08-08-2014
*/
define(["require","./graph.serieaxis"],function(t,i){var n=function(){};return $.extend(n.prototype,i.prototype,{getX:function(t){var i=-Math.round(1e3*((t-this.minY)/(this.maxY-this.minY)))/1e3*(this.axis.totalDimension-this.axis._widthLabels)-this.axis._widthLabels-5;return i},getY:function(t){var i=Math.round(1e3*((t-this.axis.getActualMin())/this.axis._getActualInterval()*(this.axis.getMaxPx()-this.axis.getMinPx())+this.axis.getMinPx()))/1e3;return i},getMinX:function(){return this.minY},getMaxX:function(){return this.maxY},getMinY:function(){return this.minX},getMaxY:function(){return this.maxX}}),n});