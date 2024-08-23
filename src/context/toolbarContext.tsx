// import React, { createContext, useContext, useState } from 'react';
// // import { useDispatch } from "react-redux";

// interface Props {
//     children?: React.ReactNode;
//     // any props that come into the component
// }

// const toolbarInitialValue = {
//     punctuation: false,
//     number: false,
//     toggleMenu: 'time',
//     toggleSubMenu: '',
//     toggleTheme: () => {},
// };
// const ToolbarContext = createContext(toolbarInitialValue);

// export const useToolbarContext = () => useContext(ToolbarContext);

// export const ToolbarContextProvider = ({ children, ...props }: Props) => {
//     const [theme, setTheme] = useState('light');
//     // const [loading, setLoading] = useState(false);
//     // const dispatch = useDispatch();
//     // const [archiveLoader, setArchiveLoader] = useState(false);

//     const toggleTheme = () => {
//         setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
//     };

//     // const toast = useSnackbar();
//     // const { notificationText } = toast;

//     // const archivePolicyApi = useCallback(
//     //   (data, onSuccessCallback = () => {}, onErrorCallback = () => {}) => {
//     //     // setArchiveLoader(true);
//     //     dispatch(archivePolicy({ ...data }))
//     //       .unwrap()
//     //       .then(res => {
//     //         onSuccessCallback(res);
//     //         // setArchiveLoader(false);
//     //         toast.success(
//     //           data?.is_archived === true
//     //             ? SUCCESSFULLY_ARCHIVED_POLICY
//     //             : SUCCESSFULLY_UNARCHIVED_POLICY,
//     //         );
//     //       })
//     //       .catch(err => {
//     //         onErrorCallback(err);
//     //         setArchiveLoader(false);
//     //         if (err?.response?.status === 424) {
//     //           return;
//     //         } else if (err?.response?.status === 403) {
//     //           toast.error(NOT_AUTHORIZED_TO_ARCHIVE_THIS_POLICY);
//     //         } else toast.error(SOMETHING_WENT_WRONG_AT_OUR_END);
//     //       });
//     //   },
//     //   [],
//     // );

//     // const values = useMemo(() => {
//     //   return {
//     //     loading,
//     //     setLoading,
//     //   };
//     // }, [loading, setLoading]);

//     return (
//         <ToolbarContext.Provider {...props} value={{ theme, toggleTheme }}>
//             {children}
//         </ToolbarContext.Provider>
//     );
// };
