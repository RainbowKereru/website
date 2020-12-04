import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  DialogActions,
  InputAdornment
} from '@material-ui/core';
import { connect } from 'react-redux';
import { addToInventory } from '../../actions/marketActions';
import { Clear, Photo, } from '@material-ui/icons';
import {useDropzone} from 'react-dropzone'

import './index.css';

function StockModal(props){
  const [ price, setPrice ] = React.useState(0)
  const [ priced, setPriced ] = React.useState(false)

  const [ name, setName ] = React.useState('')
  const [ description, setDescription ] = React.useState('')

  const [ images, setImages ] = React.useState([])

  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    setImages(acceptedFiles.concat(images))
   }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


  const handleChange = (e) => {
    setPriced(e.target.checked)
  }

  const addInventory = () => {
    props.addToInventory(name, description, images, price, () => {
      props.onClose()
    }) 

  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth>
      <DialogTitle>Add market item</DialogTitle>
      <DialogContent style={{ flexDirection: 'column', display: 'flex'}}>
           <div {...getRootProps()} className="image-selector">
             <input {...getInputProps()} />
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
                   }): <Photo />}
           </div>
           <TextField 
             label="Item name" 
             value={name} 
             onChange={(e) => setName(e.target.value)}/>
           <TextField 
             label="Item description"
             value={description} 
             onChange={(e) => setDescription(e.target.value)} multiline rows={2} />
         <FormControlLabel
        control={<Switch checked={priced} onChange={handleChange} name="checkedA" />}
        label="Priced"
        />
        {priced && (
          <TextField 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number" label="Item price" InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>
          }}/>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>Cancel</Button>
        <Button onClick={() => addInventory()} variant="contained" color="primary">Upload</Button>
      </DialogActions>
    </Dialog>
  );
}
export default connect(null, (dispatch) => ({
  addToInventory: (name, description, images, price, cb) => dispatch(addToInventory(name, description, images, price, cb)) 
}))(StockModal)
