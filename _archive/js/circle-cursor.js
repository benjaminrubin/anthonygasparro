// document.addEventListener('DOMContentLoaded', function() {
//     // Create the custom cursor element
//     const cursor = document.createElement('div');
//     cursor.className = 'custom-cursor';
//     document.body.appendChild(cursor);
    
//     // Check if device is desktop (not touch-based) and window is wide enough
//     const isDesktop = window.matchMedia('(min-width: 768px)').matches && !isTouchDevice();
    
//     // Function to detect touch devices
//     function isTouchDevice() {
//         return (('ontouchstart' in window) ||
//            (navigator.maxTouchPoints > 0) ||
//            (navigator.msMaxTouchPoints > 0));
//     }
    
//     // Enable/disable custom cursor based on device and window size
//     function toggleCustomCursor() {
//         const isWideEnough = window.matchMedia('(min-width: 768px)').matches;
        
//         if (isWideEnough && !isTouchDevice()) {
//             // Enable custom cursor on desktop - apply to HTML element for complete coverage
//             document.documentElement.classList.add('custom-cursor-enabled');
//             cursor.style.display = 'block';
//             setupCursorListeners();
//         } else {
//             // Disable custom cursor on mobile or small screens
//             document.documentElement.classList.remove('custom-cursor-enabled');
//             cursor.style.display = 'none';
//             removeCursorListeners();
//         }
//     }
    
//     // Track mouse movement and update cursor position
//     function updateCursorPosition(e) {
//         cursor.style.left = e.clientX + 'px';
//         cursor.style.top = e.clientY + 'px';
//     }
    
//     // Cursor enter/leave window
//     function showCursor() {
//         if (document.documentElement.classList.contains('custom-cursor-enabled')) {
//             cursor.style.display = 'block';
//         }
//     }
    
//     function hideCursor() {
//         cursor.style.display = 'none';
//     }
    
//     // Expand cursor on link hover
//     function expandCursor() {
//         cursor.classList.add('expanded');
//     }
    
//     function shrinkCursor() {
//         cursor.classList.remove('expanded');
//     }
    
//     // Setup all event listeners
//     function setupCursorListeners() {
//         document.addEventListener('mousemove', updateCursorPosition);
//         document.addEventListener('mouseenter', showCursor);
//         document.addEventListener('mouseleave', hideCursor);
        
//         // Handle link hover effects
//         const links = document.querySelectorAll('a');
//         links.forEach(link => {
//             link.addEventListener('mouseenter', expandCursor);
//             link.addEventListener('mouseleave', shrinkCursor);
//         });
//     }
    
//     // Remove all event listeners (for mobile mode)
//     function removeCursorListeners() {
//         document.removeEventListener('mousemove', updateCursorPosition);
//         document.removeEventListener('mouseenter', showCursor);
//         document.removeEventListener('mouseleave', hideCursor);
        
//         const links = document.querySelectorAll('a');
//         links.forEach(link => {
//             link.removeEventListener('mouseenter', expandCursor);
//             link.removeEventListener('mouseleave', shrinkCursor);
//         });
//     }
    
//     // Initial setup
//     toggleCustomCursor();
    
//     // Handle window resize
//     window.addEventListener('resize', toggleCustomCursor);
// });