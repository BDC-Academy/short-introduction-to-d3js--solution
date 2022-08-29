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

  // This time you may keep the columns you created as the are perfect ;)

}

function appendingAxis() {
  //  const xAxis = svg.append("g")
  //       .attr("class", "xAxis")
  //       .attr("transform", `translate(0, ${height - 50})`);

  //  xAxis.call(d3.axisBottom(xScale).tickFormat((label) => `${label.substr(0,2)}`));
}

function draw() {
  manuallyAppendColumn();
  dynamicallyAppendColumn();
  positioningAndSizingUsingScales();
  appendingAxis();
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