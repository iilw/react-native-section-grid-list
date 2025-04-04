# react-native-section-grid-list

A siample section list and grid list component in react native

## Installation

```sh
npm install react-native-section-grid-list
```

## Example

```js
import { SectionGridList } from 'react-native-awesome-library';
import { Text, View, StyleSheet, type SectionListData } from 'react-native';

const SECTIONS_DATA: SectionListData<string, { title: string }>[] = [
  {
    title: 'Title 1',
    data: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  },
  {
    title: 'Title 2',
    data: ['Item 1', 'Item 2'],
  },
  {
    title: 'Title 3',
    data: ['Item 1'],
  },
  {
    title: 'Title 4',
    data: ['Item 1', 'Item 2'],
  },
];

export default function App() {
  return (
    <View style={styles.container}>
      <SectionGridList
        sections={SECTIONS_DATA}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text>{item}</Text>
            </View>
          );
        }}
        renderSectionHeader={(info) => <Text>{info.section.title}</Text>}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        RowSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  itemContainer: {
    backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    // width: 100,
  },
});
```




## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
