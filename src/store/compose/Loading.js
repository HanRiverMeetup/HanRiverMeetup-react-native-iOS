import { flow, types } from 'mobx-state-tree';

const Loading = types
  .model('Loading', {
    isLoading: types.optional(types.boolean, false),
  })
  .actions(self => {
    const setLoading = isLoading => {
      self.isLoading = isLoading;
    };
    const withLoading = func =>
      flow(function*() {
        setLoading(true);
        try {
          return yield func();
        } finally {
          setLoading(false);
        }
      });

    return {
      withLoading,
    };
  });

export default Loading;
