/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* Test: Ensures the allFeeds variable has been defined
         * and that it is not empty.
         */

        it('allFeeds defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test: Loops through each feed in the allFeeds object 
         * and ensures each has a URL defined and that the URL 
         * is not empty.
         */

        it('URL defined', function() {
            for(let feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test: Loops through each feed in the allFeeds object
         * and ensures each has a name defined and that the name
         * is not empty.
         */

        it('name defined', function() {
            for(let feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test: "The Menu" */
    describe('The Menu', function() {
        let body = document.body;
        let menuIcon = document.querySelector('.header .menu-icon-link');

        /* Test: Ensures the menu element is hidden by default.
         */

        it('hidden by default', function() {
            expect(body).toHaveClass('menu-hidden');
        });

         /* Test: Ensures the menu changes visibility when the menu
          * icon is clicked.
          *     Two expectations:
          *     1. the menu displays when clicked.
          *     2. the menu hides when clicked again.
          */

        it('changes visibility', function() {
            menuIcon.click();
            expect(body).not.toHaveClass('menu-hidden');

            menuIcon.click();
            expect(body).toHaveClass('menu-hidden');
        });
    });

    /* Test: "Initial Entries" */
    describe('Initial Entries', function() {

        /* Test: Ensures when the loadFeed function is called and 
         * completes its work, there is at least a single .entry element
         * within the .feed container.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('feed has at least one entry', function() {
            let feed = document.querySelector('.feed .entry');
            expect(feed.children.length).toBeGreaterThan(0);
        });
    });

    /* Test: "New Feed Selection" */
    describe('New Feed Selection', function() {
        let feed = document.querySelector('.feed');
        let feedA = '';
        let feedB = '';

        /* Test: Ensures when a new feed is loaded by
         * the loadFeed function that the content actually changes.
         */

        beforeEach(function(done) {
            loadFeed(0, function() {
                feedA = feed.innerText;
            });
            loadFeed(1, function() {
                feedB = feed.innerText;
                done();
            });
        });

        it('content changes when a new feed is loaded', function() {
            expect(feedA).not.toEqual(feedB);
        });
    });
}());