import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import React from 'react';

const columns:ColumnsType<IModelDataType>=[
    {
        title:'Casa',
        dataIndex:'id_condomino',
        key:'id_condomino'
    },
    {
        title:'Dueño',
        dataIndex:'nombre_completo',
        key:'nombre_completo',
        render:text=><a>{text}</a>
    },
    {
        title:'Inquilino',
        dataIndex:'nombre_inquilino',
        key:'nombre_inquilino'
    },
    {
        title:'Correo',
        dataIndex:'correo',
        key:'correo'
    },
    {
        title:'Telefono',
        dataIndex:'telefono',
        key:'telefono   '
    },
]