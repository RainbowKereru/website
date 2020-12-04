export const getAssigned = (nodes, links, user) => { 
  let assigned = nodes.filter((a) => a.members && a.members.indexOf(user.username) > -1)
  return assigned;
}

export const findParent = (node, nodes, links, tops) => {
  let parent = node
  let _links = links.filter((a) => a.target == node.id)
  let _parents = _links.map((x) => nodes.filter((a) => a.id == x.source)[0])

  if(tops.map((x) => x.id).indexOf(node.id) > -1) {
    console.log("Parentable node", node.data.label)
    parent = node
  }
  

  console.log(node.data.label, _parents.length)
  if(_parents.length > 0){
    parent = _parents.map((x) => {
      if(tops.map((x) => x.id).indexOf(x.id) > -1) parent = x; 
      return findParent(x, nodes, links, tops)
    })
    return parent;
  }else{
    return parent;
  }
}

//Find children for each item in array of start points
export const walkItems = (items, nodes, links, parent) => {
  let _nodes = {}
  let paths = []

  items.map((x) => { 
    _nodes[x.id] = x;

    let children = getChildren(x, nodes, links)
    if(children.length > 0){
      let n = walkItems(children, nodes, links, parent || _nodes[x.id])
      _nodes = Object.assign({}, _nodes, n)
    }
    children.map((y) => _nodes[y.id] = {...y, parent: parent || _nodes[x.id]})
  })
  return _nodes;
}

export const traverseGraph = (start_points, nodes, links) => {
  let graph = graph || {}

  start_points.map((x) => {
    
    let children = getChildren(x, nodes, links)
    if(children.length > 0){
      children.map((x) => {
        graph[x.id] = x
        (x.id, nodes, links, graph)
      })
    }
  })
  return graph;
}

export const getGraph = (start_node, nodes, links) => {
  let graph = {}
  let children = getChildren(start_node, nodes, links)
  
}

export const getChildren = (start_node, nodes, links) => {
  let _links = links.filter((a) => a.source == start_node.id)
  let children = _links.map((x) => nodes.filter((a) => a.id == x.target)[0])
  return children;
}

export const getUnfinished = () => {

}
