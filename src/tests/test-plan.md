# Testing Plan

## Core Functionality

### Loading Screen
- [✅] Shows on initial page load
- [✅] Displays random loading messages
- [✅] Progress bar animates smoothly
- [✅] Transitions out after loading completes
- [ ] Works on mobile devices

### Navigation/Routing
- [ ] All routes work (/, /under-construction, /skills, /projects, /about, /legal, /impressum)
- [ ] 404 handling works correctly
- [✅] Navigation links render correctly
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
- [✅] AnimatedBackground renders correctly
- [✅] AnimatedBackground responds to window resize
- [✅] AnimatedBackground responds to mouse movement
- [ ] Loading animations are smooth
- [ ] No jank during page transitions
- [ ] Hover effects work properly
- [ ] Reduced motion preferences respected

## Component Testing

### LoadingScreen
- [✅] Renders correctly
- [✅] Shows progress
- [✅] Updates messages
- [✅] Transitions smoothly
- [✅] Cleans up after completion

### Header
- [✅] Contains navigation links
- [✅] Logo links to home
- [✅] Mobile menu toggle works
- [ ] Sticky positioning works
- [ ] Active state shows correctly

### AnimatedBackground
- [✅] Renders canvas element
- [✅] Handles window resize
- [✅] Responds to mouse movement
- [ ] Performs well
- [ ] Works on mobile
- [ ] Doesn't interfere with content

### TechStack
- [✅] Shows correct technologies
- [ ] Rotates items
- [ ] Responsive layout
- [ ] Hover effects work
- [ ] Animations perform well

### CommandLine
- [✅] Accepts user input
- [✅] Executes commands
- [✅] Shows command history
- [✅] Supports arrow key navigation
- [ ] Handles errors gracefully

### CommandOutput
- [ ] Renders command output correctly
- [ ] Handles different output types
- [ ] Displays error messages
- [ ] Supports scrolling for long outputs
- [ ] Maintains output history

### ProgressBar
- [ ] Renders with correct width
- [ ] Updates progress smoothly
- [ ] Shows percentage
- [ ] Supports different themes/colors
- [ ] Accessible with aria attributes

### ResumeDownload
- [ ] Download button works
- [ ] Preview opens in new tab
- [ ] Generated HTML is correct
- [ ] Mobile layout works
- [ ] Error handling works

### ResumeDropdown
- [ ] Opens and closes correctly
- [ ] Shows all options
- [ ] Handles selection
- [ ] Keyboard navigation works
- [ ] Closes on outside click

### Footer
- [ ] Links work
- [ ] Responsive layout
- [ ] Social icons show
- [ ] Copyright year is current
- [ ] Stays at bottom

### UI Components
- [ ] Button renders with correct variants
- [ ] Link component works with correct href
- [ ] Dropdown opens and closes properly
- [ ] UI components are accessible

## Page Testing

### Home (/)
- [ ] Hero section renders
- [ ] Social links work
- [✅] Tech stack shows
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

## Notes
- Add test results and findings here
- Document any bugs or issues
- Track performance metrics
- Note browser compatibility issues
- Record mobile-specific problems

## Next Steps for Testing
- Create tests for CommandLine component
- Add accessibility tests
- Implement end-to-end tests with Playwright
- Test Storyblok integration
- Add visual regression tests
