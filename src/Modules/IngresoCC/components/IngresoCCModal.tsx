import React, {useState,useContext,useEffect,useRef} from 'react'
import { SaveOutlined,CloseCircleOutlined,DeleteOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Popconfirm,Form,Row,Divider,Col,Select,Table,Tag,Space, Button} from "antd";
import { KeyObject } from 'crypto';
import { ColumnsType } from 'antd/es/table';
const {Option} = Select;
const EditableContext = React.createContext<any>(null);

const EditableRow = ({ index, ...props }:any) => {
  const [form] = Form.useForm();
  console.log(props);
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
  ...restProps
}:any) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
console.log(restProps);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        {inputType == "number"
        ?<InputNumber ref={inputRef} defaultValue={restProps.col.value} onPressEnter={save} onBlur={save} />
        :<Input ref={inputRef} onPressEnter={save} onBlur={save} />
        }
        
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 0,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};


const ContentRule = (input:any) =>{

  return(
    <Form.Item
      style={{
        margin: 0,
      }}
      name="idCondomino"
      rules={[
        {
          required: true,
          message: ` is required.`,
        },
      ]}
    >
      {input}
    </Form.Item>
  )
};

const IngresoCCModal=()=>{

    const [dataSource, setdataSource] = useState([
    {
      key: 0,
      select :0,
      name: 'Edward King 0',
      age: 32,
      address: 'London, Park Lane no. 0'
    },
    {
      key: 1,
      select :0,
      name: 'Edward King 1',
      age: 10,
      address: 'London, Park Lane no. 1'
    },
    ] as any);

    const onValUpdate = ([index,name,value]:any) => {    
      const dataIndex  = name;
      const data = [...dataSource];
      data[index][dataIndex] = value;
      setdataSource(data);
      console.log(data);
    };

    const columns = [
      {
        title: 'select',
        dataIndex: 'select',
        key:'select',
        editable:true,
        render:(text: string, row: any,index:number)=>  <Select placeholder="Seleccione" onChange={(e) => onValUpdate([index,'select',e])} defaultValue='0'><Option value="0" selected disabled>Seleccione</Option><Option value="NI">TES</Option></Select>
      },
      {
        title: 'name',
        dataIndex: 'name',
        key:'name',
      },
      {
        title: 'age',
        dataIndex: 'age',
        key:'age',
        /*type:'number',
        editable:true,*/
        render:(text: string,row: any,index:number)=> <Form.Item style={{margin: 0 }}  name={`age[${index}]`} rules={[{required: true, message: "select is required"}]}><Input type="number" min={1} defaultValue={1} value={1}/></Form.Item>,
      },
      {
        title: 'address',
        dataIndex: 'address',
        key:'address',
        render:(text: string,row: any,index:number)=><Form.Item  style={{margin: 0 }} name={`address[${index}]`} rules={[{required: true, message: "select is required"}]}><Select placeholder="Seleccione" onChange={(e) => onValUpdate([index,'select',e])} defaultValue='0'><Option value="0" selected disabled>Seleccione</Option><Option value="NI">TES</Option></Select></Form.Item>
      },
      {
        title: 'actions',
        dataIndex: 'actions',
        key:'actions',
        
        render:(text: string, row: any,index:number)=> <Button icon={<DeleteOutlined />} type='ghost' onClick={(e)=>{handleDelete(index)}}/>
      },
    ];

    const handleDelete = (key:any) => {
      console.log(key);
      const newData = dataSource.filter((item:any,index:number) => index !== key);
      setdataSource(newData);
    };

    const handleSave = (row:any) => {
      console.log('ds');
      const newData = [...dataSource];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      setdataSource(newData);
    };

  const onFinish = ({ index, ...props }:any) => {
   
  };

    const handleAddRow = () => {
      console.log('dd');
      setdataSource([...dataSource,columns]);
    };
      
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };

    const columnsx = columns.map((col:any) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record:any) => ({
          record,
          inputType: col.type === "number" ? "number" : "text",
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSave,
          col,
        }),
      };
    });

    return (   
        <React.Fragment>
          <Modal open={true} destroyOnClose={true} width={1000} footer={false} style={{top: 20}} title="Nuevo Ingreso Caja Chica">           
          <Row gutter={[16,16]} justify="end" align="middle">
            <Col>
            </Col>
            <Col>
                <Button type="primary" onClick={handleAddRow}>
                    +
                </Button>
            </Col>
        </Row>
        <Divider/>
        <Form layout='vertical' labelWrap >
            <Table
              //components={components}
              rowKey={record => record.key}
              rowClassName={() => 'editable-row'}
              bordered
              size="small"
              dataSource={dataSource}
              columns={columns}
            />
            <Divider/>
                    <Row justify='space-around'>
                        <Button type='primary' htmlType='submit' icon={<SaveOutlined/>}>
                            Guardar
                        </Button>
                    </Row>
                    </Form>
          </Modal>
          
        </React.Fragment>
    )
}

export {IngresoCCModal};