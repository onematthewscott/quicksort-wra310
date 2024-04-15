// Author: Matthew S. Hernandez
// Class: WRA 310
// Professor Jeff Kuure
// Co-Authors: Bry'jon Trice, Nadia Richardson, Nadia Theders 

// function for visualizing the smallArray
function visualizeArray(array) {
    const container = document.getElementById('visualization');
    container.innerHTML = ''; // clear out the old bars before we add new ones
    array.forEach((value, index) => {
        const bar = document.createElement('div'); // creating a new bar
        bar.style.height = `${value * 2}px`; // height based on array value
        bar.style.width = '1px'; 
        bar.classList.add('bar'); 
        container.appendChild(bar); // displays bar in container
    });
}

// quick sort algorithm 
async function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return; // base case
    }
    let index = await partition(arr, start, end); // partition the array
    if (arr.length <= 50) {
        //visualizeArray(arr); // only visualize for small arrays [this may be causing the longer compilation format.]
    }
    await quickSort(arr, start, index - 1); // sort the left side
    await quickSort(arr, index + 1, end); // sort the right side
}

// organize the array around the pivot, serves as partition function.
async function partition(arr, start, end) {
    let pivot = arr[end]; // using the last element as the pivot
    let i = start; // i will track the pivot position
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) { // if element is less than pivot, swap it to the correct position
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    // Timeout - 
    [arr[i], arr[end]] = [arr[end], arr[i]]; // swap the pivot element to its correct position
    if (arr.length <= 50) {
        await new Promise(resolve => setTimeout(resolve, 0)); // adding a bit of delay for visualization, this may cause performance issues. 
    }
    return i; // return the pivot index
}

// display the sorting time
function displayTime(arraySize, time, elementId) {
    document.getElementById(elementId).textContent = `Time to sort an array of size ${arraySize}: ${time} milliseconds.`;
}

// showing off the complexity
function displayComplexity() {
    document.getElementById('complexity').textContent = "Average Time Complexity of Quick Sort: O(n log n)";
}

// small, med, large arrays with random numbers. 
function makeArray(number) {
    let array = [];
    for (let i = 0; i < number; ++i) {
        array[i] = Math.floor(Math.random() * number); // fill it with random stuff
    }
    return array;
}

// measure how long it takes to sort the array and display it
async function sortArrayAndMeasureTime(array, elementId) {
    const startTime = performance.now(); // start the clock
    await quickSort(array); // sorting time!
    const endTime = performance.now(); // stop the clock
    displayTime(array.length, (endTime - startTime).toFixed(2), elementId); // show how long it took
}

// when we click the button, let's sort some arrays and see how quick sort works
document.getElementById('visualize').addEventListener('click', async () => {
    const smallArray = makeArray(50); // small array for visualization
    visualizeArray(smallArray);
    await sortArrayAndMeasureTime(smallArray, 'smallArrayTime'); // and time it

    const mediumArray = makeArray(1000); // medium array, no visual
    await sortArrayAndMeasureTime(mediumArray, 'mediumArrayTime'); // just time it

    const largeArray = makeArray(10000); // same with the large array
    await sortArrayAndMeasureTime(largeArray, 'largeArrayTime'); // timing again

    displayComplexity(); // show the complexity at the end
});
