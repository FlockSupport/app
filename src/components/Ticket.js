import { Card } from 'antd';
import { Tag } from 'antd';
import {

  MinusCircleOutlined
} from '@ant-design/icons';
import React from 'react';
import { Button} from 'antd';
import '../App.css';


class Ticket extends React.Component {
    state = {
        size: 'small',
        content: null,
        person: null  
      };

      async componentDidMount(){
        const url = 'https://jsonplaceholder.typicode.com/comments/';
        const response = await fetch(url);
        const data = await response.json();
        this.setState({ content: data[0].body}); 

        const second_url = 'https://jsonplaceholder.typicode.com/users/';
        const second_response = await fetch(second_url);
        const data_name = await second_response.json();
        this.setState({ person: data_name[0].name}); 
      

      }

    
      handleSizeChange = e => {
        this.setState({ size: e.target.value });
      };
    
    render() {
        const { size } = this.state;
        return (
            <Card title="Order Trouble #533" extra={<a href="#">More</a>} style={{ width: 300 }}>
                <h3>{this.state.person}</h3>
           
                   <p align="right">
                 <Tag icon={<MinusCircleOutlined />} color="default">
            Order/Delivery 
      </Tag>
      </p>
           <p>{this.state.content}</p>
          
        
            <p align="right">
            &nbsp;
            &nbsp;
        <p>Created 2 days ago.</p>
            <Button type="primary" shape="round"  size={size} >
                 Completed
        </Button>
       
      </p>
            
          </Card>
 );

}
}

export default Ticket; 
