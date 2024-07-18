// src/components/Appbar.tsx

import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';

interface AppBarProps {
    children: React.ReactNode;
    height?: number;
    backgroundColor?: string;
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  }
  
  const AppBar = ({ children, height = 50, backgroundColor = '#f0f0f0', justifyContent = 'center' }: AppBarProps) => (
    <View style={{
      flexDirection: 'row',
      justifyContent,
      backgroundColor,
      height,
    }}>
      {children}
    </View>
  );
  

export default AppBar;