# Summary
This project uses React with JSX to create a dropdown that allows for either multi-select or single-select functionality.

## Demoing
The app can be run simply by running an `npm -i` command to install all required dependencies. From there running `npm run start` should run the project on a live server. `App.js` file contains the bulk of the demo; it renders one multi-select and one single-select with associated input objects for each. Multi-select uses a list of names while single-select has options for months. When the app displays, next to each select input is a list labelled `Selected Values`. This will display the values that are returned from the options selected in the component. The idea is that the values could be submitted to a form or passed to an API.

## API
The `MultiSelect` component takes in 5 props that are explained as follows:

### isMulti
The `isMulti` prop is a boolean that determines whether the dropdown will render a multi-select dropdown, or a single-select dropdown. Multi select dropdowns will render a options with checkboxes which allow the user to determine which of the options have been selected. Additional, in multi mode the user has the option of removing selected options from the input bar, by clicking the `x` icon next to the displayed selection.

In single mode, the dropdown behaves as a typical select dropdown, where the user can select a single option.

The object returned from the component differs slightly as the multi-select version will return each return value as a key-indexed object, with the key being the original index from the options object. In single-select mode the object is a simple object with `value` and `label` attributes.

### options
The `options` prop takes in an object with the the properties `label` and `value`, indexed by a number that will determine the display order.
```
    const obj = {
        0: {
            label: "TEST"
            value: "test1"
        }
    }
```

The label determines what will be displayed in the select option, the value is presumably the value that will be passed on from the select option. The indexed key determines the order of the display in the options. I chose to use indexed keys rather than an array of Objects specifically to satisfy the requirement that `The component should render large lists efficiently`. By using indexed keys rather than an unordered array, we can quickly determine if an option has been selected without having to loop through an array and checking each individual element. This has a sideeffect that when options are selected in the multiselect, the visible options will always appear in their indexed order rather than the order they were selected, however I found this to be preferable to the performance impact that having to loop through a large array would incur. My idea here is that the indexing would be provided by whatever backend API provided the data, and in this case I would rather the backend do the heavy-lifting.

### setItems
The `setItems` prop takes a `setState` function, this is primarily used to retrieve the data that is processed by the `MultiSelect` component.

### tag
A tag that labels the MultiSelect input, set by the user.

### placeholder
An optional placeholder value when the `MultiSelect` input is empty. This defaults to an empty input if left blank

## Bonus Considerations
Some things I added to the `MultiSelect` that were not specifically mentioned as requirements in the project spec are as follows

### Search
I included search functionality for both the single and multi select options. The user can use the searchbar to filter through the options. This should be especially helpful in the case of a very large list of options, or if a user has many selected options in multi-select mode they can easily search to find an option that they wish to unselect.

### Remove Selection From Input
I included a simple UI that allows a user to unselect an option even if the dropdown is not open. By clicking the `x` icon near a selected option in the input, the user can unselect an option.

## Things I would add given more time
I would also like to mention some features that I would have liked to add if I had more time to work on the project as follows:

### Size prop
An optional size prop that could be used to create smaller or larger sizes for the component. This would be passed in as an enum i.e. `sm`, `md`, `lg`. Using scss interpolation we could have preset component widths that would render based on which prop was passed in.

### Backend Discussion
Since there were no specifications on how the data input for the component should be shaped, I took some liberties based on assumptions that I made on my own:
    1. We must be able to support a large amount of options, possibly in the thousands
    2. The user can select any number of options without limit
    3. The order of the options is important, and must be preserved whenever we process the data.

These considerations could differ however from the actual use case of the component. If for example our use case required us to limit the amount of options a user could select, or we knew for certain we would never have more than X amount of options, then the component could have been designed with that in mind, and some changes could have been made, i.e. using an array of objects rather than a key-indexed object. These discussions are pivotal to front-end development and I would look forward to them at Hive if given the opportunity.

### CSS/SCSS naming
Assuming this component would fit into some sort of design system, I would have liked to discuss with design/product about how this component fits into the front-end ecosystem. Naming conventions for css/scss classes could definitely be tightened up however that would require some context on how this component fits into the rest of the system.
