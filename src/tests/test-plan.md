# Testing Plan

## Core Functionality

### Loading Screen
- [x] Shows on initial page load
- [x] Displays random loading messages
- [x] Progress bar animates smoothly
- [x] Transitions out after loading completes
- [ ] Works on mobile devices

### Navigation/Routing
- [ ] All routes work (/, /under-construction, /skills, /projects, /about, /legal, /impressum)
- [ ] 404 handling works correctly
- [x] Navigation links render correctly
- [ ] Navigation menu highlights current page
- [ ] Mobile menu opens/closes correctly
- [ ] Links work in mobile menu

### Mobile Responsiveness
- [ ] Test on different viewport sizes:
  - [ ] Mobile (<768px)
  - [ ] Tablet (768px-1024px)
  - [ ] Desktop (>1024px)
- [ ] No horizontal scrolling
- [ ] Images scale properly
- [ ] Text remains readable
- [ ] Interactive elements have adequate touch targets

### Animation Performance
- [x] AnimatedBackground renders correctly
- [x] AnimatedBackground responds to window resize
- [x] AnimatedBackground responds to mouse movement
- [ ] Loading animations are smooth
- [ ] No jank during page transitions
- [ ] Hover effects work properly
- [ ] Reduced motion preferences respected

## Component Testing

### LoadingScreen
- [x] Renders correctly
- [x] Shows progress
- [x] Updates messages
- [x] Transitions smoothly
- [x] Cleans up after completion

### Header
- [x] Contains navigation links
- [x] Logo links to home
- [x] Mobile menu toggle works
- [ ] Sticky positioning works
- [ ] Active state shows correctly

### AnimatedBackground
- [x] Renders canvas element
- [x] Handles window resize
- [x] Responds to mouse movement
- [ ] Performs well
- [ ] Works on mobile
- [ ] Doesn't interfere with content

### TechStack
- [x] Shows correct technologies
- [ ] Rotates items
- [ ] Responsive layout
- [ ] Hover effects work
- [ ] Animations perform well

### CommandLine
- [x] Accepts user input
- [x] Executes commands
- [x] Shows command history
- [x] Supports arrow key navigation
- [ ] Handles errors gracefully

### CommandOutput
- [x] Renders command output correctly
- [x] Handles different output types
- [x] Displays error messages
- [ ] Supports scrolling for long outputs
- [ ] Maintains output history

### ProgressBar
- [x] Renders with correct width
- [ ] Updates progress smoothly
- [x] Shows correct aria attributes
- [ ] Supports different themes/colors
- [x] Applies correct styling

### ResumeDownload
- [x] Download button works
- [x] Preview opens in new tab
- [x] Generated HTML is correct
- [ ] Mobile layout works
- [x] Error handling works

### ResumeDropdown
- [x] Renders dropdown button
- [x] Renders dropdown items
- [x] Handles selection (onOpen)
- [x] Handles selection (onDownload)
- [x] Includes download icon

### Footer
- [x] Links work
- [ ] Responsive layout
- [x] Social icons show
- [x] Copyright year is current
- [ ] Stays at bottom

### UI Components
- [x] Button renders with correct variants
- [x] Link component works with correct href
- [x] Dropdown opens and closes properly
- [x] UI components are accessible

## Page Testing

### Home (/)
- [ ] Hero section renders
- [ ] Social links work
- [x] Tech stack shows
- [ ] CTA buttons work
- [ ] Animations perform well

### Under Construction
- [ ] Shows correct message
- [ ] Image loads
- [ ] Return home link works
- [ ] Responsive layout
- [ ] Animations work

### Skills
- [ ] All skills show
- [ ] Categories are clear
- [ ] Responsive grid
- [ ] Hover effects work
- [ ] Loading state handles well

### Projects
- [ ] Projects load
- [ ] Images show
- [ ] Links work
- [ ] Tags show
- [ ] Responsive grid

### About
- [ ] Bio renders
- [ ] Image loads
- [ ] Social links work
- [ ] Responsive layout
- [ ] Sections are clear

### Legal/Impressum
- [ ] Content renders
- [ ] Links work
- [ ] Responsive layout
- [ ] Text is readable
- [ ] Structure is clear

### Blog
- [ ] Blog index page loads
- [ ] Blog posts render correctly
- [ ] Storyblok integration works
- [ ] Images and formatting preserved
- [ ] Responsive on all devices

## Accessibility Testing
- [ ] Proper heading structure
- [ ] Alt text for images
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Sufficient color contrast
- [ ] ARIA attributes used correctly

## Performance Testing
- [ ] Initial load time < 3s
- [ ] Time to interactive < 5s
- [ ] Lighthouse score > 90
- [ ] No render-blocking resources
- [ ] Optimized images and assets

