import React from 'react';

import { withRouter } from 'react-router-dom';
import { 
  TextField,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';
import YActions from '../../actions/yActions';
import HiveEditor from 'react-hive-flow';
import jwt_decode from 'jwt-decode';
import 'react-hive-flow/dist/index.css';
import './index.css';

const yActions = YActions()

let yArray;
function PlanBlock(props){

  const [ doc, setDoc ] = React.useState(null)

  const [ nodes, setNodes ] = React.useState([])
  const [ links, setLinks ] = React.useState([])

  React.useEffect(() => {
    if(yArray){
      yArray.unobserve(planObserver)
      setNodes([])
      setLinks([])
    }

    let flowName = `flow-${props.match.params.id}`
    console.log(flowName)
    yArray = yActions.getMap(flowName)
    
    setDoc(yArray)
    yArray.observe(planObserver)

    let obj = yArray.toJSON()
    
    if(obj.links != null) setLinks(obj.links)
    if(obj.nodes != null) setNodes(obj.nodes)
  }, [props.match.params.id])

  const planObserver = () => { 
    if(yArray){
      let obj = yArray.toJSON()
      if(obj.nodes != null){
        setNodes(obj.nodes.map((x) => Object.assign({}, x))) 
      }
      if(obj.links != null) {
        setLinks(obj.links.map((x) => Object.assign({}, x)))
      }
    }
  }

  const _setNodes = (nodes) => {
    setNodes(nodes)
    if(doc){
      doc.set('nodes', nodes)
    }
  }

  const _setLinks = (links) => {
    setLinks(links)
    if(doc){
      doc.set('links', links)
    }
  }

  const menuOpts = [
    {
      label: (node) => {
        if(node.members && node.members.indexOf(props.user.username) > -1){
          return "Leave";
        }else{
          return "Join"
        }
      },
      action: (node, editor) => {
        editor.updateNode(node.id, (node) => {
          if(node.members && node.members.indexOf(props.user.username) > -1){
            node.members.splice(node.members.indexOf(props.user.username), 1)
          }else{
            if(!node.members) node.members = []
            node.members.push(props.user.username)
          }
          console.log(node)
          return node;
        })
      }
    },
    {
      label: (node) => {
        return "Set Date"
      },
      action: (node, editor) => {

      }
    },
    {
      label: (node) => {
        return "Attach"
      },
      action: (node, editor) => {

      }
    }
  ]

  console.log(props)

  return (
    <>
    <HiveEditor
      nodeTypes={[]}
      nodes={nodes}
      links={links}
      modalBody={(NodeType, node, editor) => {
        return (
          <div className="hive-modal">
            <div className="hive-node">
              <NodeType.modal node={node} />
              <div className="hive-team">
                Team
                {node.members && node.members.map((x) => (
                  <div>{x}</div>
                ))}
              </div>
            </div>
            <div className="hive-menu">
              {menuOpts.map((x) => (
                <Button variant="contained" onClick={() => x.action(node, editor)}>{x.label(node)}</Button>
              ))}
            </div>
          </div>
        );
      }}
      onJoinNode={(cb) => {
        cb(props.user._id)
      }}
      onNodeChange={(nodes) => {
        _setNodes(nodes)
      }}
      onLinkChange={(links) => {
        _setLinks(links)
      }}
    />
    </>
)
} 

export default connect((state) => ({
  user: jwt_decode(state.auth.token)
}))(withRouter(PlanBlock))
