import './App.css'

function App()
{
  const FriendGetList = async () =>
  {
    try
    {
      const response = await fetch('http://localhost:3000/friend/friend_get_list', {
        method: 'GET',
      })

      const returnData = await response.json()
      alert('FriendGetList: ' + returnData.message)
      console.log('FriendGetList:', returnData.message) 
    }
    catch (error)
    {
      alert('Error: ' + error)
      console.error('Error:', error)
    }
  }

  const FriendDelete = async () =>
  {
    try
    {
      const response = await fetch('http://localhost:3000/friend/friend_delete', {
        method: 'DELETE',
      })

      const returnData = await response.json()
      alert('FriendRequestDelete: ' + returnData.message)
      console.log('FriendRequestDelete:', returnData.message)
    }
    catch (error)
    {
      alert('Error: ' + error)
      console.error('Error:', error)
    }
  }

  const FriendRequestGetList = async () =>
  {
    try
    {
      const response = await fetch('http://localhost:3000/friend/friend_request_get_list', {
        method: 'GET',
      })

      const returnData = await response.json()
      alert('FriendRequestGetList: ' + returnData.message)
      console.log('FriendRequestGetList:', returnData.message)
    }
    catch (error)
    {
      alert('Error: ' + error)
      console.error('Error:', error)
    }
  }

  const FriendRequestAdd = async () =>
  {
    try
    {
      const response = await fetch('http://localhost:3000/friend/friend_request_add', {
        method: 'PUT',
      })

      const returnData = await response.json()
      alert('FriendRequestAdd: ' + returnData.message)
      console.log('FriendRequestAdd:', returnData.message)
    }
    catch (error)
    {
      alert('Error: ' + error)
      console.error('Error:', error)
    }
  }

  const FriendRequestDelete = async () =>
  {
    try
    {
      const response = await fetch('http://localhost:3000/friend/friend_request_delete', {
        method: 'DELETE',
      })

      const returnData = await response.json()
      alert('FriendRequestDelete: ' + returnData.message)
      console.log('FriendRequestDelete:', returnData.message)
    }
    catch (error)
    {
      alert('Error: ' + error)
      console.error('Error:', error)
    }
  }

  return (
    <>  
      <main style={{ fontFamily: 'Arial'}}>
        <h1>Spanko</h1>
        <h2>Friend Management</h2>
        
        <hr />

        <button onClick={FriendGetList}>FriendGetList</button>
        &nbsp;
        <button onClick={FriendDelete}>FriendDelete</button>
        &nbsp;
        <button onClick={FriendRequestGetList}>FriendRequestGetList</button>
        &nbsp;
        <button onClick={FriendRequestAdd}>FriendRequestAdd</button>
        &nbsp;
        <button onClick={FriendRequestDelete}>FriendRequestDelete</button>
      </main>
    </>
  )
}

export default App
