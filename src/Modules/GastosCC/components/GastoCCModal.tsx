import React, {useState,useContext,useEffect,useRef} from 'react'
import { SaveOutlined,CloseCircleOutlined } from '@ant-design/icons';
import {Modal,Input,InputNumber,Popconfirm,Form,Row,Divider,Col,Select,Table,Tag,Space, Button} from "antd";
import { KeyObject } from 'crypto';
import { ColumnsType } from 'antd/es/table';

const EditableContext = React.createContext<any>(null);
const EditableRow = ({ index, ...props }:any) => {
  const [form] = Form.useForm();
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
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const GastoCCModal=()=>{

    const [lstdataSource, setdataSource] = useState([
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
          editable: true,
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
          editable: true,
        },
       ] as any);
    
       const columns = [
          {
            title: 'name',
            dataIndex: 'name',
          },
          {
            title: 'age',
            dataIndex: 'age',
          },
          {
            title: 'address',
            dataIndex: 'address'
          },
        ];
    
        const count = 2;
    
        const handleDelete = (key:any) => {
          const dataSource = lstdataSource.filter((item:any) => item.key !== key);
          lstdataSource(dataSource);
        };
          
        const components = {
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        };
    
        const columnsx = lstdataSource.map((col:any) => {
          console.log(col);
          if (!col.editable) {
            console.log(col);
            return col;
          }
    
          return {
            ...col,
            onCell: (record:any) => ({
              record,
              editable: col.editable,
              dataIndex: col.dataIndex,
              title: col.title,
              handleSave: handleDelete,
            }),
          };
        });
        
    return (
        <React.Fragment>
            <Modal open={true} destroyOnClose={true} width={1000} style={{top:20}} title="Nuevo Gasto Caja Chica">
                dsads
                <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                size="small"
                dataSource={lstdataSource}
                columns={columns}
                />
            </Modal>
        </React.Fragment>
    )

 }

export {GastoCCModal};