import { Fragment, useCallback, useMemo } from 'react';
import {
  SectionList,
  StyleSheet,
  View,
  type DefaultSectionT,
  type SectionListProps,
  type SectionListRenderItemInfo,
} from 'react-native';
import { chunkArray } from './array';

export interface SectionGridListProps<Item = any, Section = DefaultSectionT>
  extends SectionListProps<Item, Section> {
  numColumns: number;
  RowSeparatorComponent?: SectionListProps<Item>['ItemSeparatorComponent'];
}

export function SectionGridList<Item, Section>({
  sections,
  numColumns,
  renderItem,
  ItemSeparatorComponent,
  RowSeparatorComponent,
  ...props
}: SectionGridListProps<Item, Section>) {
  const chunkedSections = useMemo(() => {
    return sections.map((section) => {
      return {
        ...section,
        data: chunkArray(section.data, numColumns),
      };
    });
  }, [sections, numColumns]);

  const renderItemRow = useCallback(
    (info: SectionListRenderItemInfo<Item[], Section>) => {
      return (
        <>
          <View style={styles.rowContainer}>
            {[...info.item, ...Array(numColumns - info.item.length)].map(
              (item, index) => (
                <Fragment key={`${info.index}-${index}`}>
                  <View
                    style={styles.itemContainer}
                    pointerEvents={item === null ? 'none' : undefined}
                  >
                    {item && (
                      <>
                        {renderItem?.({
                          item,
                          index,
                          section: info.section as any,
                          separators: info.separators,
                        })}
                      </>
                    )}
                  </View>
                  {ItemSeparatorComponent && index !== numColumns - 1 && (
                    <ItemSeparatorComponent />
                  )}
                </Fragment>
              )
            )}
          </View>
          {RowSeparatorComponent && <RowSeparatorComponent />})
        </>
      );
    },
    [renderItem, ItemSeparatorComponent, RowSeparatorComponent, numColumns]
  );
  return (
    <SectionList<Item[], Section>
      {...props}
      // @ts-ignore
      sections={chunkedSections}
      renderItem={renderItemRow}
    />
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  itemContainer: {
    flex: 1,
  },
});
