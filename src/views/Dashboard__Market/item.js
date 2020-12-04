import React from 'react';
import { 
  TextField,
  Typography,
  InputAdornment,
  Fab
} from '@material-ui/core';
import { connect } from 'react-redux';
import { updateInventory, addToInventory } from '../../actions/marketActions';
import { Done, Clear, Photo, Backup } from '@material-ui/icons';
import {useDropzone} from 'react-dropzone'
import './item.css';

function MarketItem(props){
  const [ loading, setLoading ] = React.useState(false)

  const [ name, setName ] = React.useState('')
  const [ description, setDescription ] = React.useState('')
  const [ price, setPrice ] = React.useState('')

  const [ images, setImages ] = React.useState([])
  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    setImages(images.concat(acceptedFiles))
   }, [images])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  const add = () => {
    setLoading(true)
    if(!props.item._id){
      props.addToInventory(name, description, images, price, () => {
        setLoading(false)
        props.history.push('/dashboard/market/stall')
      })
    }else{
      props.updateInventory(props.item._id, {
        name: name,
        description: description,
        photos: images,
        price: price
      }, () => {
        setLoading(false)
        props.history.push('/dashboard/market/stall')
      })
    }
  }


  React.useEffect(() => {
    if(props.item){
      setName(props.item.name)
      setDescription(props.item.description)
      setPrice(props.item.price)
    }
  }, [props.item])

  console.log(props.item)


  return (
    <div className="market-item-view">
      <div className="market-item">
        <Typography>Images</Typography>
        <div {...getRootProps()} className="image-selector">
          <input {...getInputProps()} />
            {props.item && props.item.photos.map((x) => {
             console.log(x)
              return(
                <img src={`https://api.rainbowkereru.com/market/media/${x}`} />
              )
            })}
               {images.length > 0 ?
                   images.map((x, ix) =>{
                     return (
                       <div className="image-selector_item">
                         <Clear style={{height: 25, width: 25}} onClick={(e) => {
                           let i = images.slice()
                           i.splice(ix, 1)
                           setImages(i)
                           e.stopPropagation()
                         }}/>
                         <img src={URL.createObjectURL(x)} />
                       </div>
                     )
                   }): null}
          <Backup style={{marginLeft: 8}} />
        </div>

      <TextField 
        label="Item Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)}/>
      <TextField 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description" 
        multiline 
        rows={4} 
        rowsMax={7} />
      <TextField 
        label="Categories" />
      <TextField 
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        label="Price" 
        type="number" 
        InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }} />
      </div>
      <div className="market-info">

      </div>
        
      <Fab 
        disabled={loading} 
        onClick={add} 
        style={{backgroundColor: 'green', color: 'white', position: 'absolute', right: 12, bottom: 12, zIndex: 9}}>
          <Done /> 
        </Fab>
    </div>
  );
}

export default connect((state, ownProps) => ({
  item: state.market.inventory.filter((a) => a._id == ownProps.match.params.id)[0]
}), (dispatch) => ({
  updateInventory: (id, obj, cb) => dispatch(updateInventory(id, obj, cb)),
  addToInventory: (name, description, images, price, cb) => dispatch(addToInventory(name, description, images, price, cb)) 
}))(MarketItem)
