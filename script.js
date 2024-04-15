// Quick sort algorithm
async function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return; // Base case
    }
    let index = await partition(arr, start, end); // Partition the array
    await quickSort(arr, start, index - 1); // Sort the left side
    await quickSort(arr, index + 1, end); // Sort the right side
}

// organize the array here
async function partition(arr, start, end) {
    let pivot = arr[end]; // last element is the pivot 
    let i = start; // track the pivot partition
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) { // If element is less than pivot, swap it to the correct position
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[end]] = [arr[end], arr[i]]; // Swap the pivot element to its correct position
    return i; // return pivot index
}

// display sorting time
function displayTime(arraySize, time, elementId) {
    document.getElementById(elementId).textContent = `Time to sort an array of size ${arraySize}: ${time} milliseconds.`;
}

// display complexity
function displayComplexity() {
    document.getElementById('complexity').textContent = "Average Time Complexity of Quick Sort: O(n log n)";
}

// generate arrays with random numbers
function makeArray(number) {
    let array = [];
    for (let i = 0; i < number; ++i) {
        array[i] = Math.floor(Math.random() * number); // Fill it with random values
    }
    return array;
}

// Measure how long it takes to sort the array and display it
async function sortArrayAndMeasureTime(array, elementId) {
    const startTime = performance.now(); // Start the clock
    await quickSort(array); // Sorting time!
    const endTime = performance.now(); // Stop the clock
    const duration = (endTime - startTime).toFixed(3);
    displayTime(array.length, duration, elementId); // Show how long it took
    console.log(`Sorted array of size ${array.length} in ${duration} milliseconds.`);
}

// When we click the button, let's sort some arrays and see how quick sort works
document.getElementById('visualize').addEventListener('click', async () => {
    const smallArray = makeArray(50); // Small array
    await sortArrayAndMeasureTime(smallArray, 'smallArrayTime'); // And time it

    const mediumArray = makeArray(1000); // Medium array, no visual
    await sortArrayAndMeasureTime(mediumArray, 'mediumArrayTime'); // Just time it

    const largeArray = makeArray(10000); // Same with the large array
    await sortArrayAndMeasureTime(largeArray, 'largeArrayTime'); // Timing again

    displayComplexity(); // Show the complexity at the end
});
