import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { GameController } from 'phosphor-react-native'

import { styles } from './styles';
import { DuoInfo } from '../DuoInfo';
import { THEME } from '../../theme';

export interface DuoCardProps {
    id: string,
    hourEnd: string,
    name: string,
    hourStart: string,
    useVoiceChannel: boolean,
    weekDays: string[],
    yearsPlaying: number,
}

interface Props  {
    data: DuoCardProps;
    onConnect: () => void;
}

export function DuoCard({data, onConnect}:Props) {
    
  return (
    <View style={styles.container}>
        <DuoInfo 
            label='Nome'
            value={data[0].name}
        />
        <DuoInfo 
            label='Tempo de jogo'
            value={`${data[0].yearsPlaying} ano(s)`}
        />
        <DuoInfo 
            label='Disponibilidade'
            value={`${data[0].weekDays.length} dias \u2022 ${data[0].hourStart} - ${data[0].hourEnd}`}
        />
        <DuoInfo 
            label='Chamada de áudio'
            value={data[0].useVoiceChannel? 'Sim' : 'Não'}
            colorValue={data[0].useVoiceChannel? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
        />

        <TouchableOpacity 
            style={styles.button}
            onPress={onConnect}
        
        >
            <GameController 
                color={THEME.COLORS.TEXT}
                size={20}
            />
            <Text style={styles.buttonTitle}>
               Conectar
            </Text>
        </TouchableOpacity>
    </View>
  );
}