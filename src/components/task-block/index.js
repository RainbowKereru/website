import React from 'react';

import { 
  TextField,
  ListItem,
  List
} from '@material-ui/core';

import { connect } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { walkItems, findParent, getAssigned } from '../../y-utils/tasks';

function TaskBlock(props){

  const [ tasks, setTasks ] = React.useState([])

  const peerObserver = () => {
    if(props.y){
      let obj = props.y.toJSON()

      
      let assigned = getAssigned(obj.nodes, obj.links, props.user)
      let graph = walkItems(assigned, obj.nodes, obj.links)

      console.log(graph)      
      let nodes = []
      for(var k in graph){
        nodes.push(graph[k])
      }
      console.log(nodes)
      setTasks(nodes)
    }
  }

  React.useEffect(() => {
    if(props.y){
      props.y.observe(peerObserver)
    }
  }, [props.y])

  return (
    <div>
      <List>
          {tasks.filter((a) => a.data.status == 'UNFINISHED').map((x) => (
          <ListItem button>{x.data.label} - {x.parent && x.parent.data.label}</ListItem>
        ))}
      </List>
    </div>
)
} 

export default connect((state) => ({
  user: jwt_decode(state.auth.token)
}))(TaskBlock)

