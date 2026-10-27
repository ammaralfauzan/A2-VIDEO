import React, {useContext} from 'react';

// true saat adegan dirender di dalam kamera versi vertikal 9:16. Elemen yang ditata ulang
// khusus vertikal (island, teks empati, penutup) tidak digambar di stage.
export const VerticalContext = React.createContext(false);
export const useVertical = () => useContext(VerticalContext);
