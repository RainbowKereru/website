import React from 'react';

import { withRouter } from 'react-router-dom';
import { 
  TextField,
  Button
} from '@material-ui/core';
import { connect } from 'react-redux';

import HiveEditor from 'react-hive-flow';
import jwt_decode from 'jwt-decode';
import 'react-hive-flow/dist/index.css';
import './index.css';

function TimelineBlock(props){


  const [ nodes, setNodes ] = React.useState([])
  const [ links, setLinks ] = React.useState([])


  const _setNodes = (nodes) => {
    setNodes(nodes)
  }

  const _setLinks = (links) => {
    setLinks(links)
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
    <div className="timeline-block">
    <HiveEditor
      direction={"horizontal"}
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
    </div>
)
} 

export default connect((state) => ({
  user: jwt_decode(state.auth.token)
}))(withRouter(TimelineBlock))
