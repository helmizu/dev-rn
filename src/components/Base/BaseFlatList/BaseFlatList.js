import React from 'react';
import { View, ActivityIndicator, FlatList, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { noop } from '../../../utils';
import { useThemeContext } from '../../../utils/ThemeContext';
import styles from './BaseFlatList.styles';
import useBaseFlatList from './useBaseFlatList';

const RenderFooter = () => {
    const context = useThemeContext();
    return (
        <ActivityIndicator size="large" color={context.colors.basePrimaryMain} />
    );
};

const FlatListItemSeparator = () => {
  return <View style={styles.separator} />;
};

export const BaseFlatList = (props) => {
  const { data, renderItem, onLoadMore, onPullDown, meta } = props;
  const {
    keyExtractor,
    onEndReached,
    onRefresh,
    getItemLayout,
    isRefresh,
    showFooter,
  } = useBaseFlatList(onLoadMore, onPullDown, meta);

  return (
    <FlatList
      style={{ width: '100%' }}
      data={data}
      renderItem={renderItem}
      onEndReachedThreshold={0.1}
      ListFooterComponent={showFooter && <RenderFooter />}
      ItemSeparatorComponent={FlatListItemSeparator}
      onEndReached={() => onEndReached()}
      onRefresh={() => onRefresh()}
      refreshing={isRefresh}
      getItemLayout={getItemLayout}
      removeClippedSubviews={Platform.OS === 'android'}
      maxToRenderPerBatch={data.length}
      initialNumToRender={20}
      windowSize={50}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
};

BaseFlatList.propTypes = {
  onLoadMore: PropTypes.func,
  onPullDown: PropTypes.func,
  data: PropTypes.instanceOf(Array),
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
  meta: PropTypes.instanceOf(Object),
};

BaseFlatList.defaultProps = {
  onLoadMore: noop,
  onPullDown: noop,
  data: [],
  meta: {},
};
