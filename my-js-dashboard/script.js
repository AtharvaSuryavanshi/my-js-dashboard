// script.js

// 1. Dummy Data 
const articlesData = [
    {
        title: "How to Generate More Leads in League of Legends",
        keyword: "League of Legends [250000]",
        words: 3571,
        createdOn: "2 hours ago",
        action: "View",
        publish: true,
    },
    {
        title: "How to Latest Gaming in League of Legends",
        keyword: "League of Legends [250000]",
        words: 2870,
        createdOn: "4 days ago",
        action: "View",
        publish: false,
    },
    {
        title: "The Ethical Executive Assistant [2024]",
        keyword: "virtual executive assistant [2024]",
        words: 2400,
        createdOn: "2 days ago",
        action: "View",
        publish: true,
    },
    {
        title: "Greenlane Graphics Design Services",
        keyword: "greenlane graphics design services",
        words: 3041,
        createdOn: "-",
        action: "View",
        publish: false,
    },
    {
        title: "Tax planning strategies for Quick Business Growth",
        keyword: "business growth",
        words: 2487,
        createdOn: "-",
        action: "View",
        publish: true,
    },
    {
        title: "Backlinks: What are backlinks and why are they important? (Pre...",
        keyword: "backlinks",
        words: 1730,
        createdOn: "-",
        action: "View",
        publish: false,
    },
    {
        title: "5 Landing Ai Tools in 2023 (Review & Compare)",
        keyword: "ai tools",
        words: 843,
        createdOn: "-",
        action: "View",
        publish: true,
    },
    {
        title: "Greenlane Graphics Design Services for your DIY",
        keyword: "greenlane graphics design services",
        words: 1010,
        createdOn: "-",
        action: "View",
        publish: false,
    },
];

// 2. Get References to DOM Elements
const articlesTableBody = document.querySelector('#articlesTable tbody');
const articleSearchInput = document.getElementById('articleSearch');
const totalArticlesSpan = document.getElementById('totalArticles');
const currentRowCountSpan = document.getElementById('currentRowCount');
const loadingRow = document.getElementById('loadingRow'); // Get the loading row element

// 3. Function to Render Table Rows
/**
 * Renders the provided article data into the HTML table.
 * @param {Array<Object>} dataToRender - The array of article objects to display.
 */
function renderTable(dataToRender) {
    // Hide loading indicator
    if (loadingRow) {
        loadingRow.style.display = 'none';
    }

    // Clear any existing rows in the table body
    articlesTableBody.innerHTML = '';

    // If no data, display a message and update row count
    if (dataToRender.length === 0) {
        const noResultsRow = document.createElement('tr');
        const noResultsCell = document.createElement('td');
        noResultsCell.colSpan = 6; // Span across all columns
        noResultsCell.style.textAlign = 'center';
        noResultsCell.style.padding = '20px';
        noResultsCell.textContent = 'No articles found matching your search.';
        noResultsRow.appendChild(noResultsCell);
        articlesTableBody.appendChild(noResultsRow);
        currentRowCountSpan.textContent = 0; // Update current row count
        return;
    }

    // Loop through the data and create table rows
    dataToRender.forEach(article => {
        const row = document.createElement('tr');

        // Populate the row with cell data
        row.innerHTML = `
            <td>${article.title}</td>
            <td>${article.keyword}</td>
            <td>${article.words}</td>
            <td>${article.createdOn}</td>
            <td><button class="action-button">${article.action}</button></td>
            <td>
                <div class="publish-switch ${article.publish ? 'checked' : ''}" data-publish="${article.publish}"></div>
            </td>
        `;
        articlesTableBody.appendChild(row);
    });

    // Update the displayed current row count
    currentRowCountSpan.textContent = dataToRender.length;
}

// 4. Function to Handle Search/Filtering
/**
 * Filters the articles data based on the search input value and re-renders the table.
 */
function handleSearch() {
    // Show loading indicator before filtering (briefly, for visual effect)
    if (loadingRow) {
        articlesTableBody.innerHTML = ''; // Clear current rows
        loadingRow.style.display = 'table-row'; // Show loading row
    }

    // Simulate a small delay for loading effect
    setTimeout(() => {
        const searchTerm = articleSearchInput.value.toLowerCase(); // Get search term and convert to lowercase
        const filteredData = articlesData.filter(article =>
            // Check if title or keyword includes the search term
            article.title.toLowerCase().includes(searchTerm) ||
            article.keyword.toLowerCase().includes(searchTerm)
        );
        renderTable(filteredData); // Re-render table with filtered data
    }, 300); // 300ms delay
}

// 5. Event Listener for Publish Switch Toggle
/**
 * Handles click events on the table body, specifically for the publish switches.
 * Toggles the 'checked' class and updates the data-publish attribute.
 * @param {Event} event - The click event object.
 */
function handlePublishSwitchClick(event) {
    const target = event.target;
    // Check if the clicked element is a publish switch
    if (target.classList.contains('publish-switch')) {
        // Get the current publish state from the class
        let isPublished = target.classList.contains('checked');
        // Toggle the state
        isPublished = !isPublished;
        // Add or remove the 'checked' class based on the new state
        target.classList.toggle('checked', isPublished);
        // Update the data-publish attribute (useful for debugging or future data persistence)
        target.dataset.publish = isPublished.toString();

        // In a real application, you would send this update to a backend
        // or update the 'articlesData' array directly if it's client-side state.
        // For this example, we are only updating the UI.
    }
}

// 6. Initial Load and Attaching Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Show loading indicator initially
    if (loadingRow) {
        loadingRow.style.display = 'table-row';
    }

    // Simulate data fetching delay
    setTimeout(() => {
        // Render the table with all initial data when the DOM is fully loaded
        renderTable(articlesData);

        // Update the total number of articles displayed in the footer
        totalArticlesSpan.textContent = articlesData.length;
    }, 500); // 500ms delay for initial load

    // Add an event listener to the search input for real-time filtering
    articleSearchInput.addEventListener('input', handleSearch);

    // Add a delegated event listener to the table body for publish switches
    // This is more efficient than adding listeners to each switch individually
    articlesTableBody.addEventListener('click', handlePublishSwitchClick);
});
