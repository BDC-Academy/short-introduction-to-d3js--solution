/**
 * D3.js is in essence a DOM manipulation library.
 * It can be used to essentially manipulate any DOM be it HTML, SVG, Canvas or some other shiny DOM from the future (as long as you can use JavaScript with it).
 *
 * D3.js is actually a bundle of different packages
 * - that contain utils like d3-array, d3-format, d3-time, etc.
 * - that contain functionality that make it easier to work with the (SVG) DOM like d3-shape, d3-path, d3-polygon, etc.
 * - that make it a breeze to calculate positions and sizes like d3-interpolate, d3-random and d3-scale, etc.
 * - that make it possible to generate whole parts or components of a chart like d3-axis and d3-brush
 * - but also packages that are specifically designed to help with creating certain (complex) visualisations like d3-force, d3-hierarchy, d3-geo, etc.
 * 
 * Of all these packages, there is one that is at the base of everything and probably the most important, and that is d3-selection.
 * D3 selections are used to manipulate DOM elements and join data and and DOM elements, effectively 'binding' data-items to DOM elements.
 * It uses the same chaining syntax that JQuery does, making it easier to do a lot of small updates in quick succession.
 * A selection can contain multiple, one or no elements, but works the same no matter how many elements it contains.
 * 
 * In the assigments below, we will mostly look at using d3 selections.
 * Besides that we will touch on some array and formatting utils and use d3-scale and d3-axis to create x and y axis and calculate elements x,y,height and width.
 * D3.js can get kinda complex pretty easy, so don't worry if you don't understand everything right away. It is a short introduction after all ;) 
 *
 * We are going to recreate the chart we made with SVG only with D3.js. 
 * Before we begin, there are already some pieces of code written below to make live a bit easier. 
 * Everything that is surrounded by ##readonly## should, as you would guess, not be altered. Let's look at the readonly code together real quick (give the teacher a 'yo' when you're done reading here)
*/

/**
 * We start with drawing the rectangles or columns manually with D3.js.
 * We will use the functions d3.select, d3.selectAll, d3.append and d3.attr to achieve this.
 */
function manuallyAppendColumn() {
  // TODO 1.1: Use the d3.select function to select the svg element by its id attribute 'd3-chart'.
  // Store the result in a variable 'svg'. The result will be of type 'Selection'.
  const svg = d3.select('#d3-chart');

  // TODO 1.2: Use the d3.append function on the svg variable and append a 'rect' to it.
  // Store the rect element in a variable 'rect'.
  // You can see in the DOM that d3 already has appended the rect to the svg.
  const rect = svg.append('rect');

  // TODO 1.3: Use the d3.attr function on the rect variable to set the attribute 'width' of the rect to 40.
  // After that also set the following attributes using chaining syntax:
  // height: 200, x: 180, y: 100 and fill: green
  rect.attr('width', 40).attr('height', 200).attr('x', 180).attr('y', 100).attr('fill', 'green');

  // TODO 1.4: Create 2 more columns using the append function on the svg variable.
  // Put one on the right and one on the left, make them blue and change their height. Remember where svg y=0 was and how the rect is drawn?
  svg.append('rect').attr('width', 40).attr('height', 100).attr('x', 135).attr('y', 200).attr('fill', '#294899');
  svg.append('rect').attr('width', 40).attr('height', 150).attr('x', 225).attr('y', 150).attr('fill', '#294899');

  // Woop woop! We created our first columns using D3.js!
  // But we did it manually and not based on any data, That's not very useful..

  // TODO 1.5: Use the .selectAll function on the svg variable to select every rect that is a direct child of this svg and store the result in a variable 'allRects'.
  // This result will also be of type 'Selection'. See what the result looks like by using the browsers debugging tools.
  const allRects = svg.selectAll('rect');

  // TODO: 1.6 Change the color of all rects we selected to 'red', by using the .attr function on 'allRects'.
  // You can treat a selection that contains more elements the same way as a selection with one element.
  allRects.attr('fill', 'red');

  // TODO: 1.7 Finally, remove all the rects again by calling the .remove function on 'allRects'.
  allRects.remove();
}

/**
 * Adding a rectangle or column manually is not very practical.
 * We probably want to add columns based on some dataset we have laying around... o.O
 * Let's do that again but based on our actual dataset we already defined below.
 * We will use the functions d3.selectAll, selection.data and selection.enter to achieve this.
 * 
 * Note: student beware! D3.js selections and data joining can become pretty magical pretty fast.
 * It's not a problem if you can't wrap your mind around it right away. You will eventually, someday.. maybe..
 */
function dynamicallyAppendColumn() {
  // TODO 2.1: Use the d3.select function to select the svg element again and store it in variable 'svg'.
  const svg = d3.select('#d3-chart');

  // TODO 2.2: Use the .selectAll function on 'svg' to selectAll rect's inside the svg and store it in variable 'allRects',
  // But wha? There are no rect's inside our svg yet.. anymore.
  // That's right, so our selection will be empty initially.
  const allRects = svg.selectAll('rect');

  // TODO 2.3: Bind our dataset to the selection and store the result in a variable 'boundRects'
  // There is this function called .data on every selection. You can supply it with every value you want, as long as it is iterable.
  // When you do this all kinds of magic happens under water. D3.js is actually 'joining' the elements in our selection with our data, much like an SQL join works.. sorta.
  // After you bound the dataset to our selection, use the browser debugger tools to see what our selection 'boundRects' looks like and ask your teacher wtf.
  // Notice that allRects and boundRects are not the same selection anymore.
  const boundRects = allRects.data(dataset);

  // TODO: 2.4: use the .enter function that is now available on our selection 'boundRects'
  // to get the selection of elements that do not exist in the DOM yet but do exist in data. Store it in a variable 'enterSelection'.
  // Inspect the result again using debugger. The enter selection contains five items that are 'placeholders' for DOM elements.
  const enterSelection = boundRects.enter();

  // TODO: 2.5: Add a rect element for each placeholder element that is in our enterSelection.
  // You can treat the enter selection the same as every other, so chaining append or attr for example.
  // call the append function on the enterSelection, append a 'rect' and store the result in variable 'appendedSelection'.
  // Inspect the result again using debugger. The enter selection now contains five items that are svg rect elements.
  const appendedSelection = enterSelection.append('rect');

  // TODO 2.6: Set the attrs of the rects in our appendedSelection.
  // But what value do we use for our attr width, height, etc.? Well that is where our data comes in.
  // You can supply a function as an argument for most of the D3 chaining functions, including attr.
  // These functions are called 'accessor functions' (see link 'controlling flow of data' in readme)
  // and always get three arguments supplied to them: (d)ata-item, (i)ndex, (n)odes.
  // The data-item is actually one of the items in the dataset we used with the data function, 
  // the index is the current iteration index (d3 is actually iterating) and nodes are all the nodes in our current selection.
  // You can define an accessor function as an anonymous (arrow) function like so: enterSelection.attr('height', (d, i, n) => ...return a number...)
  // It's not yet possible to properly calculate our height, x and y based on our data-item so we will improvise a bit.
  // Set the attrs width, height, x and of our enterSelection using accessor functions, except for width which should always be 40.
  // Set height to d.value * 3, set x to i * 45 + 90 and set y to height - 50 - d.value * 3
  appendedSelection
    .attr('width', 40)
    .attr('fill', '#294899')
    .attr('x', (d, i, n) => i * 45 + 90)
    .attr('height', (d, i, n) => d.value * 3)
    .attr('y', (d, i, n) => height - 50 - d.value * 3)

  // TODO 2.7: redo step 2.2 to 2.6 in one chain
  // I though D3.js could chain all the things? Yes it can but this was easier to learn what was happening.
  // Instead of storing a new selection every step, you can chain everything from step 2.2 to 2.6, so go do it.
  //...

  // TODO Extra: How could you make the 3rd column appear green again?

  // TODO 2.8: delete every column again (sorry)
  // by binding an empty dataset to our appendedSelection with the data function
  // and chain calling the .exit function to get the selection of elements that are in the DOM but not in the data.
  // Chain call the .remove function to remove all.
  appendedSelection.data([]).exit().remove();

}

/**
 * Now we added our columns dynamically, but we still had to manually calculate what position an size they should have.
 * D3.js has utils for that you know, so let's those instead.
 * We can use d3-scales to convert our data into y, x, height and width values. D3.js uses interpolation for this.
 * We will use the functions d3.scaleLinear, d3.scaleBand and d3.scaleOrdinal to achieve this.
 */
function positioningAndSizingUsingScales() {
  // TODO 3.1: Start by calling d3.scaleLinear which will return a scaling function. Store the scaling function as yScale.
  // See why we use a linear scale for our y? When we created the y axis in svg, it went from number 0 to 100 in equally divided steps.
  const yScale = d3.scaleLinear();

  // TODO 3.2: Configure the yScale using the property setter functions it provides.
  // You can configure scales by (chain) calling the setter functions ot exposes.
  // The most important one's are domain and range.
  // Domain defines the minimum and maximum number between which our data values will / must reside.
  // Range defines the (range of) values that are used in the scales underlying interpolation. 
  // In other words it maps (sort of) a specific domain value (usually number) to a specific range value (usually a number that represents a y or x coordinate).
  // Call the .domain function on the yScale and set it to our min and maximum values: [0, 100]
  // After that chain call the .range function on the yScale and set it's value to 
  // y position/pixels that we want to make available to our columns: [350, 50] (ask your friendly wtf)
  // Note: usually, the max value is calculated using for example d3.max and sometimes the min value is calculated also, but it should almost always be 0.
  yScale.domain([0, 100]).range([350, 50]);

  // TODO 3.3: Create our xScale function by calling d3.scaleBand and set its domain and range.
  // Our x scale is not a linear or numeric scale. It actually is a 'categorical dimension', as it is divided into the categories maandag,dinsdag,woensdag,donderdag,vrijdag.
  // A scale band takes all our categories as domain and takes a numeric range. It maps (interpolates) each category to a specific number in the range.
  // Create the xScale scaling functions using d3.scaleBand, set its domain to [maandag,dinsdag,woensdag,donderdag,vrijdag] and its range to [80, 320].
  // Note: to get the domain of the xScale, you could/should use dataset.map
  const xScale = d3.scaleBand().domain(dataset.map(d => d.label)).range([80, 320]).paddingInner([0.1]).paddingOuter([0.2]);

  // TODO 3.4: Create a colorScale scaling function by calling d3.scaleOrdinal and set its domain and range.
  // We can actually create a scale to determine the color of our columns, as we want the center one (woensdag) to be green.
  // You do this by creating an ordinal scale with d3.scaleOrdinal. a scaleband is actually a special kind of ordinal scale that outputs numbers.
  // Create an ordinal scale with our dataset labels as domain and and equal number of colors as range [blue, blue, green, blue, blue]
  // Note: our colorScale is pretty simple, it actual is a one on one mapper, but can be handy when you don't know how much labels you have. You can also use color interpolation using for other scaling types.
  const colorScale = d3.scaleOrdinal().domain(dataset.map(d => d.label)).range(['#294899', '#294899', 'green', '#294899', '#294899']);

  // TODO 3.5: Call each scales with arbitrary values within their domain 
  // and use the browser debugger to see what they return. 
  // For example: const y = yScale(34)

  // TODO 3.5: Create the columns again and use the scales to get the x,y and width and height values.
  // Now that we created our scales we can use them to calculate the position and sizing of elements, based on our data.
  // Select our svg using d3.select and create the columns again like we did in assigment 2.
  // Use the scales to calculate what the values for x, y, width, height and fill should be.
  // You can get the value or label you need from d in the accessor functions (d, i, nodes) =>
  // - calculate width: scaleBand has another function you can use to get the width of a column / category called .bandwidth()
  // - calculate x: call xScale with the category/label from d
  // - calculate y: call yScale with the value from d
  // - calculate height: take the max y position (350) and substract the yScale result of d.value
  // - calculate fill: use the colorScale with d.label
  const svg = d3.select('#d3-chart');
  svg.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('width', (d, i, nodes) => xScale.bandwidth())
    .attr('fill', (d, i, nodes) => colorScale(d.label))
    .attr('x', (d, i, n) => xScale(d.label))
    .attr('height', (d, i, n) => 350 - yScale(d.value))
    .attr('y', (d, i, n) => yScale(d.value))

  // TODO 3.6: Add inner and outer padding to the xScale
  // You will notice that the columns are squished together.
  // That is because we did not set any so called (inner) padding between the bars nor on the outside (outer padding).
  // Use the .paddingInner setter function on the bandScale and set it to [0.1]. Set the .paddingOuter to [0.2].

  // TODO 3.7: Return our scales so we may use them in our next assigment
  // This time you may keep the columns you created as the are perfect ;)
  // In fact, we need the scales we created in the next assigment so we want to return them here as a result of this function.
  return { yScale, xScale, colorScale };
}

/**
 * We created scales and used them to position our elements and calculate their size.
 * We can also use these scale the generate axis with D3. D3 will actually use the scale the same way 
 * we did to generate lines and 'ticks' and position them correctly.
 * We will use the functions d3.axisBottom and d3.axisLeft to generate our axis. The result of these functions are generators that generate an axis 'component'.
 * After that we can use setter functions on the axis to tweak it visually. 
 */
function appendingAxis(scales) {
  // Note: we need our scales to generate axis with D3
  const { yScale, xScale, colorScale } = scales;

  // TODO 4.1: Create a g element that functions as a container for an axis
  // Before we generate an axis we need a place to put it in the DOM, a container group element.
  // Select our svg with id 'd3-chart' and append a g element to it with id 'x-axis'. store the g element as variable 'xAxis'.
  const svg = d3.select('#d3-chart');
  const xAxis = svg.append('g').attr('id', 'x-axis').attr('transform', 'translate(0, 350)');

  // TODO 4.2: Use the d3.axisBottom to generate our xAxis
  // To generate an axis with D3, we can create an axis generator using the axis functions.
  // You just need to provide a D3 scale as a single argument, our xScale, to the axis function and it will return a generator.
  // We can't reach our xScale from here, so you will need to extract it outside our previous assigment or copy it here.
  // store the resulting generator of .axisBottom in a variable 'xAxisGenerator'.
  const xAxisGenerator = d3.axisBottom(xScale).tickFormat((label, d) => `${label.substr(0, 2)}`).tickSize(0);

  // TODO 4.3: Use the generator function and pass our g container element xAxis as a single argument to generate our x axis
  // Note: By the way, it is called axisBottom because D3 will put the 'ticks' below the horizontal line. Guess what axisTop, axisLeft axisRight do :)
  xAxisGenerator(xAxis);

  // TODO 4.4: Position the axis correctly by transform the group element xAxis.
  // An axis will always be generated at the 'origin' position so our xAxis is now hanging from the ceiling..
  // Why? because our scale is one-dimensional, from the left to the right, horizontal. So y will always be 0, which is at the top of the svg.
  // Now that the axis is visible we can edit it's appearance by modifying it's DOM elements and the g container and also by using the generator's setter functions.
  // Start by adding an attr 'transform' to the g element and set its value to translate(0, 350).

  // TODO 4.5: Use the generator setter functions to change the tick appearances
  // Wow, it fits perfectly! It's even centered beneath the column correctly. It still is ugly though..
  // First of all, we don't want to see the full label, just the first 2 letters. You can do this by using the generator's tickFormat setter. 
  // The tickFormat function receives an accessor as single argument, with d being a 'tick' which in this case is a label from our xScale's domain.
  // Call the .tickFormat on the generator using chaining (.axisBottom().tickFormat()) and return a substr of d.
  // We also don't want those ugly vertical lines pointing to our tick values.
  // Remove these by chaining another setter function to the generator .tickSize, and set it to 0.

  // TODO 4.6: Manually change the styling of our axis elements
  // To actually change the style of our axis and make it appear bold, red, etc. we need select the correct elements and set their attrs.
  // Inspect the DOM if you haven't already and see what elements the axis has.
  // Select the #x-axis with D3 and set the following attributes to make it appear the same as our svg only chart: font-size, font-family, font-weight, color.
  // Select the line/path .domain and make its stroke-width '2px'.
  // Note: instead of using attributes, you can set/override most of the styling with a 'style' attr that takes a CSS string.
  // Note2: you can actually do all this in one chain using a nested selection.
  d3.select('#x-axis')
    .attr('font-size', '14px')
    .attr('font-family', 'Helvetica Neue')
    .attr('font-weight', 'bold')
    .attr('color', 'red')
    .select('.domain')
    .attr('stroke-width', '2px');

  // TODO 4.7: now create the yAxis the same way you did the xAxis
  // Not gonna tell you how yet, you figure it out!
  const yAxis = svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', 'translate(80, 0)');
  const yAxisGenerator = d3.axisLeft(yScale).tickSize(0);
  yAxisGenerator(yAxis);

  d3.select('#y-axis')
    .attr('font-size', '14px')
    .attr('font-family', 'Helvetica Neue')
    .attr('font-weight', 'bold')
    .attr('color', 'red')
    .select('.domain')
    .attr('stroke-width', '2px');

  // Wooptiedoo, almost there!
}

/**
 * We only need to add gridlines and real values to finish our chart and make it visually appealing and useable.
 * We will once again use our scales to calculate the position of the text and line elements, based on the dataset and ticks.
 * We won't be using any new D3 functions, except for getting the ticks that our yScale generates based on it's configuration,
 * which we will use a dataset for the gridlines.
 */
function appendingValuesAndGridLines(scales) {
  // Note: we need our scales to calculate position
  const { yScale, xScale, colorScale } = scales;
  const svg = d3.select('#d3-chart');

  // TODO: 5.1: append text elements to the top of each column with their value
  // First let's add the text elements that show the numeric value that the columns represent.
  // Append another g element to the svg and .selectAll text elements inside it (there are none yet)
  // Chain call the data function with our dataset as value and call .enter to get the generated 
  // selection of elements that are not yet in the DOM.
  // Chain call .append to actually add the text elements to the DOM.
  // Now we can set the attributes of each text element:
  // The actual text of a svg text-element is set with a property 'textContent' instead of an attribute.
  // To account for this (and some other properties), D3 has added another setter function you can chain called 'text'.
  // Use .text to set the content of each text element. The text should be d.value.
  // Now for positioning the elements, use the scales to set the text element's y and x, just like we did with our column rect elements.
  // If you haven't done it already, see what the result is on screen. 

  // Almost, but not yet done.
  // We want our text to be hanging, so set the dominant-baseline.
  // Set the fill to white to make it more readable.
  // Our text is not centered inside the column. This is because the column starts drawing at the top left and we put our text at the exact same y.
  // To center the text we will add half a column to the text's x value, so 40 / 2 = 20 
  // still not there yet, because our text-anchor is still start, set it to middle and we are done!

  svg.append('g')
    .attr('id', 'values')
    .selectAll('text')
    .data(dataset)
    .enter()
    .append('text')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'hanging')
    .attr('x', (d) => xScale(d.label) + 20) // + 20 is half a column
    .attr('y', (d) => yScale(d.value))
    .text((d) => d.value);


  // TODO 5.2: Create horizontal grid lines using the array of ticks the yScale generates
  // To create our tick lines we use multiple line elements just like we did at the svg only chart.
  // To know how many gridlines we need and where to put them, we need to know what ticks are generated by the yScale.
  // We can get an array of all ticks that our current configuration of the yScale generates with the .tick function.
  // Call the .tick function on the yScale and store the result in variable 'yTicks'.
  // The yTicks array contains all tickvalues that our y-axis is showing, including 0. We don't want a gridline at 0 so remove it from the array.

  // Now we can use the ticks as our data to generate the gridlines.
  // Append a g element to the svg and selectAll line in it (none yet, you know).
  // Chain call the .data function and supply the yTicks as dataset.
  // Now .enter and append line to actually add the lines to the DOM.
  // Give each line a stroke, stroke-width and stroke-dasharray.
  // Finally, to calculate each lines x1, x2, y1 and y2 we use our scales again.
  // The y's are both the same and are exactly the same as the y of the ticks. d will be the tick value which we can use with the yScale to calculate to correct y1 and y2 positions. do it.
  // To calculate x, we need to know where our scale range starts. You can get the range of a scale by calling .range on it without arguments. It will return exactly what you put into it [80, 320]
  // Set x1 to the start of the range of xScale and x2 to the end of the range of xScale

  // You've probably noticed that the order of svg elements is important, as our gridlines are now on top our bars... :S
  // You can fix this by using svg.insert() instead of .append. insert takes two arguments: the element name and secondly a css element selector.
  // use .insert instead of append at the g container element and use :first-child as second argument.

  const yTicks = yScale.ticks();
  yTicks.shift();

  svg.insert('g', ':first-child')
    .attr('id', 'grid-lines')
    .selectAll('line')
    .data(yTicks)
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('stroke', '#ccc')
    .attr('stroke-width', '1')
    .attr('stroke-dasharray', '4 1')
    .attr('y1', (d) => yScale(d))
    .attr('y2', (d) => yScale(d))
    .attr('x1', (d) => xScale.range()[0])
    .attr('x2', (d) => xScale.range()[1]);
}

function draw() {
  manuallyAppendColumn();
  dynamicallyAppendColumn();
  const scales = positioningAndSizingUsingScales();
  appendingAxis(scales);
  appendingValuesAndGridLines(scales);
}

//## readonly ##
const dataset = [
  { label: 'maandag', value: 33 },
  { label: 'dinsdag', value: 50 },
  { label: 'woensdag', value: 66 },
  { label: 'donderdag', value: 83 },
  { label: 'vrijdag', value: 100 },
];

/**
 * Already doing some d3 selection voodoo here and using chaining syntax.
 * @param {*} width 
 * @param {*} height 
 * @param {*} id 
 * @returns 
 */
function createSVGSVGElement(width, height, id) {
  // select the element we want to add our svg graphic to, our root div 
  const rootSelection = d3.select('#root');
  // append an svg element to our root element with D3
  const svgSelection = rootSelection.append('svg');

  // using chaining syntax (selection is returned after (almost) every function call)
  svgSelection.attr('id', id)
    .attr('class', 'my-graphic')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height]);

  return svgSelection;
}
const width = 400, height = 400;
createSVGSVGElement(width, height, 'd3-chart');
draw();
// ##readonly##