import React, { useCallback, useEffect, useState, useContext } from 'react';

import { Context } from '../../context/AuthContext';
import * as yup from 'yup';
import aguias from '../../assets/aguias.png';
import fotoTodos from '../../assets/foto_aguias.jpeg';
import { Menubar } from '../../components/Menubar';
import styles from './styles.module.scss';

import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    VerticalGridLines,
    VerticalBarSeries,
    HorizontalBarSeries,
    RadialChart,
    Hint
} from 'react-vis';
import { Value } from 'sass';
import api from '../../services/api';
import { DashboardUser } from '../../components/TableList/DashboardTable/DashboardUser';
import { DashboardUnidade } from '../../components/TableList/DashboardTable/DashboardUnidade';

type DashboardBarProps = {
    nome: string;
    sobrenome: string;
    pontos: number;
}

type DashboardCircleProps = {
    nome: string;
    pontos: number;
}

export function Dashboard() {

    // const [unidadeChart, setUnidadeChart] = useState<string>();
    const { handleLogOut, usuario } = useContext(Context);

    const [desbravadorLista, SetDesbravadorLista] = useState<DashboardBarProps[]>([]);
    const [unidadeList, SetUnidadeList] = useState<DashboardCircleProps[]>([]);
    const [dashboardBar, SetDashboardBar] = useState<any[]>([]);
    const [dashboardCircle, SetDashboardCircle] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState(1);

    const getDashboardBar = useCallback(async () => {
        try {
            const { data } = await api.get<DashboardBarProps[]>(`/dashboard/dashboradbar`);

            const dadosGrafico = data.map((valor, index) => {
                const dadosProGrafico = {
                    x: `${valor.nome} ${valor.sobrenome}`,
                    y: valor.pontos,
                    color: index
                }

                return dadosProGrafico;
            });

            SetDesbravadorLista(data);
            SetDashboardBar(dadosGrafico);

        } catch {
            handleLogOut();
        }
    }, []);

    const getDashboardCircle = useCallback(async () => {
        try {
            const { data } = await api.get<DashboardCircleProps[]>(`/dashboard/dashboardcircle`);

            const dadosGraficoCircle = data.map((valor, index) => {
                const dadosProGrafico = {
                    angle: valor.pontos,
                    label: valor.nome,
                    radius: index
                }

                return dadosProGrafico;
            });

            SetUnidadeList(data);
            SetDashboardCircle(dadosGraficoCircle);
        } catch {
            handleLogOut();
        }
    }, []);

    useEffect(() => {
        getDashboardBar();
        getDashboardCircle();
    }, []);

    return (
        <>
            <Menubar>

                <div className={`container mx-auto`}>

                    {/* Gráfico desbravadores aguitos */}
                    <div className={`flex justify-center ${styles.areaBox}`}>

                        <XYPlot margin={{ bottom: 70 }} xType="ordinal" width={1200} height={300} >
                            <VerticalGridLines

                            />
                            <HorizontalGridLines />
                            <XAxis
                                tickLabelAngle={-10}
                                style={
                                    {
                                        fontSize: 9,
                                        fontWeight: 'bold'
                                    }
                                }
                            />
                            <YAxis
                                tickLabelAngle={-10}
                                style={
                                    {
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }
                                }
                            />
                            <VerticalBarSeries
                                barWidth={0.3}
                                // data={[
                                //     { x: 'Apples', y: 10, color: 1 },
                                //     { x: 'Bananas', y: 5, color: 2 },
                                //     { x: 'Cranberries', y: 15, color: 3 },
                                //     { x: 'Leis', y: 54, color: 4 },
                                //     { x: 'Trunks', y: 32, color: 5 },
                                //     { x: 'vegeneddx', y: 43, color: 6 },
                                //     { x: 'vegened', y: 23, color: 7 },
                                // ]}
                                data={dashboardBar}
                                colorRange={['#d41515', '#2596be', '#3d5760']}
                            />


                        </XYPlot>
                    </div>

                    <div className={`flex flex-row `} >
                        <div className={`graphicUnidades  ${styles.areaBox}`}>
                            <h3 className={`text-5xl font-bold`} >Unidades</h3>
                            <RadialChart
                                data={dashboardCircle}
                                // data={
                                //     [
                                //         { angle: 2, label: 'águia de fogo', radius: 3 },
                                //         { angle: 3, label: 'águia dourada', radius: 3 },
                                //         { angle: 4, label: 'águia americana', radius: 4 },
                                //         { angle: 5, label: 'águia real', radius: 5 }
                                //     ]
                                // }
                                width={500}
                                height={500}
                                onValueMouseOver={v => {
                                    // setUnidadeChart(v.label)
                                }}
                                padAngle={0.04}
                                getAngle={d => d.angle}
                                showLabels
                                labelsStyle={{ fontSize: 15, fontWeight: 'bold' }}
                                colorRange={['#d41515', '#2596be', '#3d5760', '#1c1843']}
                            >

                            </RadialChart>
                        </div>

                        <div className={`graphicEspecialista ${styles.areaBox} ${styles.listaDesbravador}`} >
                            <DashboardUser
                                title='Lista de Desbravadores'
                                list={desbravadorLista}
                            />
                        </div>

                        <div className={`graphicEspecialista ${styles.areaBox} ${styles.listaUnidade}`} >
                            <DashboardUnidade
                                title='Lista de Unidades'
                                list={unidadeList}
                            />
                        </div>
                    </div>


                </div>

            </Menubar>
        </>
    );
}

