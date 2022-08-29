// // Tip: If you don't know what values or calculations to use,
// // see svg-margin-container.html for examples and explanations

// /**
//  * Creates a g element that acts as a container for all elements
//  * and append it to the svg
//  */
// function createMarginContainer() {
//   const g = createG();

//   g.setAttribute('id', 'margin-container');
//   g.setAttribute('transform', `translate(${margins.left}, ${margins.top})`);

//   svgDynamicChartElement.appendChild(g);
// }

// /**
//  * Creates an axis tick and appends it to the parentElement
//  * @param {string} text 
//  * @param {number} x 
//  * @param {number} y 
//  * @param {SVGElement} parentElement
//  */
// function createTick(text, x, y, parentElement) {
//   //TODO: 2.1 Create a text element using the createText function and the incoming parameters
//   // and append the text element to the parentElement (which will probably be an axis ;))
//   const element = createText(text, x, y);

//   parentElement.appendChild(element);
// }

// /**
//  * Creates the y-axis of the chart
//  * and appends it to the margin container.
//  */
// function createYAxis(data) {
//   const min = 0; // Math.min(...data.map(({ percentage }) => percentage));
//   const max = 100; // Math.max(...data.map(({ percentage }) => percentage));
//   const tickValues = [min, 20, 40, 60, 80, max]; // could be calculated by dividing max by desired number of ticks and using that to fill the tickValues
  
//   // TODO: 2.2 Calculate how many pixels should be between tick elements
//   // Note: You can find the formula in svg-margin-container.html
//   const spaceBetweenTicks = chartHeight / (tickValues.length - 1);

//   // TODO: 2.3 Create the outer and inner g elements using the createG function and 
//   // set any attributes on them that need to be set (do we need to translate anything?)
//   // Append the inner g to the outer g and the outer g to the marginContainer
//   const outerG = createG();
//   const innerG = createG();
//   outerG.appendChild(innerG);
//   innerG.setAttribute('transform', `translate(-10, 0)`);
//   innerG.setAttribute('text-anchor', `end`);
//   marginContainer.appendChild(outerG);

//   // TODO: 2.4 Create a line element using the createLine function and append it to the outer g
//   // Note: use chartHeight
//   const line = createLine(0, 0, 0, chartHeight);
//   outerG.appendChild(line);

//   // TODO: 2.5 Create a tick element using the createTick function for each item in the tickValues array
//   // Note: you need spaceBetweenTicks to calculate y
//   tickValues.reverse().forEach((tick, i) => {
//     createTick(`${tick}%`, 0, i * spaceBetweenTicks, innerG);
//   });
// }

// /**
//  * Creates the x-axis of the chart
//  * and appends it to the margin container
//  */
// function createXAxis(data) {
//   // data.map((item) => item.label);
//   const tickValues = ['jan', 'feb', 'ma', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
//   // TODO: 2.6 Calculate how many pixels should be between tick elements
//   const spaceBetweenTicks = chartWidth / tickValues.length;

//   // TODO: 2.7 Create the outer and inner g elements using the createG function and 
//   // set any attributes on them that need to be set (do we need to translate anything?)
//   // Append the inner g to the outer g and the outer g to the marginContainer
//   const outerG = createG();
//   outerG.setAttribute('transform', `translate(0, ${chartHeight})`);
//   const innerG = createG();
//   innerG.setAttribute('transform', `translate(${spaceBetweenTicks / 2}, 20)`);
//   innerG.setAttribute('text-anchor', `middle`);
//   outerG.appendChild(innerG);
//   marginContainer.appendChild(outerG);

//   // TODO: 2.8 Create a line element using the createLine function and append it to the outer g
//   // Note: use chartWidth
//   const line = createLine(0, chartWidth, 0, 0);
//   outerG.appendChild(line);

//   // TODO: 2.9 Create a tick element using the createTick function for each item in the tickValues array
//   // Note: you need spaceBetweenTicks to calculate x
//   tickValues.forEach((tick, i) => {
//     createTick(`${tick}`, i * spaceBetweenTicks, 0, innerG);
//   });
// }

// /**
//  * Creates the columns based on the values in the provided data
//  * @param {Array} data
//  */
// function createColumns(data) { 
//   const min = Math.min(...data.map(({ percentage }) => percentage)); 
//   const max = Math.max(...data.map(({ percentage }) => percentage));
//   const innerPadding = 2;

//   // TODO: 2.10 Calculate how many pixels should be between ticks
//   // and what the width of a rect should be 
//   const spaceBetweenTicks = chartWidth / data.length;
//   const columnWidth = spaceBetweenTicks - innerPadding;

//   const getX = (rectIndex) => spaceBetweenTicks * rectIndex;
//   // TODO: 2.11 Create a function getY that receives the height of a rect
//   // and returns the corresponding y coordinate of a rect
//   // Note: the y=0 is at the top of the svg, which makes y=chartHeight the bottom of the svg
//   const getY = (height) => chartHeight - height;
//   // TODO: 2.12 Create a function getHeight that receives a value from the data
//   // and returns the height that the rect should be
//   // Note: you will need chartHeight and max to calculate the height of a rect/bar 
//   // If the maximum value will take up 100% of the chartHeight ()
//   const getHeight = (value) => chartHeight / max * value;

//   // TODO: 2.13 Create the outer and inner g elements using the createG function and 
//   // set any attributes on them that need to be set (do we need to translate anything?)
//   // Append the inner g to the outer g and the outer g to the marginContainer
//   const outerG = createG();
//   const innerG = createG();
//   innerG.setAttribute('transform', `translate(2, 0)`);
//   outerG.appendChild(innerG);
//   marginContainer.appendChild(outerG);

//   // TODO: 2.14 Create a rect element, using the createRect function, 
//   // for each item in the data array and append the rect to the innerG.
//   // Note: you need percentage, spaceBetweenTicks, columnWidth and the getter functions.
//   data.forEach((item, i) => {
//     const { percentage } = item;
//     const x = getX(i);
//     const height = getHeight(percentage);
//     const y = getY(height);

//     const rect = createRect(x, y, columnWidth, height);

//     innerG.appendChild(rect);
//   });

// }

// /**
//  * Creates a polyline with points based on the provided data array.
//  * 
//  * @param {Array} data 
//  */
// function createDataLine(data) {
//   // TODO: Extra Create a polyline based on the same data as the columns
//   // Make sure the line points are centered on the bars
//   // Note: also use a g element wrapper, or two!
//   const min = 0, max = 100;
//   const spaceBetweenTicks = chartWidth / data.length;
//   const getX = (index) => spaceBetweenTicks * index;
//   const getY = (percentage) => chartHeight - (chartHeight / max * percentage);

//   const outerG = createG();

//   const innerG = createG();
//   innerG.setAttribute('transform', `translate(${spaceBetweenTicks / 2}, 0)`);
//   outerG.appendChild(innerG);

//   const points = data.map(({ percentage }, i) => {
//     const x = getX(i);
//     const y = getY(percentage);

//     return [x, y];
//   });
//   const pointsString = points.map(([x, y]) => `${x} ${y}`).join(',');

//   const polyline = createPolyline(pointsString);

//   innerG.appendChild(polyline);

//   marginContainer.appendChild(outerG);
// }


// //###### readonly ######

// /**
//  * Create and return an line element
//  * @param {number} x1 
//  * @param {number} x2
//  * @param {number} y1 
//  * @param {number} y2 
//  * @returns {SVGElement} 
//  */
// function createLine(x1, x2, y1, y2) {
//   const element = createSVGElement('line');

//   element.setAttribute('x1', x1);
//   element.setAttribute('x2', x2);
//   element.setAttribute('y1', y1);
//   element.setAttribute('y2', y2);
//   element.setAttribute('stroke', '#000000');
//   element.setAttribute('stroke-width', '2');

//   return element;
// }

// /**
//  * 
//  * @param {*} points 
//  * @returns 
//  */
// function createPolyline(points) {
//   const element = createSVGElement('polyline');

//   element.setAttribute('points', points);
//   element.setAttribute('stroke', 'red');
//   element.setAttribute('stroke-width', '2');
//   element.setAttribute('fill', 'transparent');
//   element.setAttribute('stroke-linejoin', 'round');

//   return element;
// }

// /**
//  * Create and return a text element
//  * @param {string} text 
//  * @param {number} x 
//  * @param {number} y 
//  * @returns {SVGElement}
//  */
// function createText(text, x, y) {
//   const element = createSVGElement('text');

//   element.setAttribute('x', x);
//   element.setAttribute('y', y);
//   element.textContent = text;

//   return element;

// }

// /**
//  * Create and return a rect element
//  * @param {number} x 
//  * @param {number} y 
//  * @param {number} width 
//  * @param {number} height 
//  * @returns {SVGElement}
//  */
// function createRect(x, y, width, height) {
//   const element = createSVGElement('rect');

//   element.setAttribute('x', x);
//   element.setAttribute('y', y);
//   element.setAttribute('width', width);
//   element.setAttribute('height', height);
//   element.setAttribute('fill', '#294899');

//   return element;
// }

// /**
//  * Create and return a g elelement
//  * @returns {SVGElement}
//  */
// function createG() {
//   const element = createSVGElement('g');

//   return element;
// }

// /**
//  * Try and find a DOM element by id.
//  * @param {string} id without the prefix #
//  * @returns DOM element if it can be found
//  */
// function getElementById(id) {
//   const element = document.querySelector(`#${id}`);

//   return element;
// }

// /**
//  * Creates an svg element with tagName. 
//  * The svg namespace is needed or else the browser will create an unknown HTML element.
//  * 
//  * @param {string} tagName 
//  * @returns 
//  */
// function createSVGElement(tagName) {
//   const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

//   return element;
// }


// // Set-up and create our chart
// const svgDynamicChartElement = getElementById('dynamic-chart');
// const svgHeight = svgDynamicChartElement.getBoundingClientRect().height;
// const svgWidth = svgDynamicChartElement.getBoundingClientRect().width;
// const margins = { left: 100, top: 20, right: 20, bottom: 50 };
// const chartHeight = svgHeight - margins.top - margins.bottom;
// const chartWidth = svgWidth - margins.left - margins.right;
// const dataset = [
//   { label: 'jan', percentage: 40 }, { label: 'feb', percentage: 23 },
//   { label: 'ma', percentage: 44 }, { label: 'apr', percentage: 97 },
//   { label: 'mei', percentage: 12 }, { label: 'jun', percentage: 10 },
//   { label: 'jul', percentage: 50 }, { label: 'aug', percentage: 60 },
//   { label: 'sep', percentage: 70 }, { label: 'okt', percentage: 80 },
//   { label: 'nov', percentage: 90 }, { label: 'dec', percentage: 100 }
// ];
// // const dataset2 = [
// //   { label: 'jan', percentage: 40 }, { label: 'feb', percentage: 23 },
// //   { label: 'ma', percentage: 44 }, { label: 'apr', percentage: 65 },
// //   { label: 'sep', percentage: 70 }, { label: 'okt', percentage: 80 }
// // ];

// createMarginContainer();
// const marginContainer = getElementById('margin-container');
// createYAxis(dataset);
// createXAxis(dataset);
// createColumns(dataset);
// createDataLine(dataset);



// // ###### end readonly ######