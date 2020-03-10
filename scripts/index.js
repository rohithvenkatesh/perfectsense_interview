$(document).ready(() => {
	var allComments = {}

	// helper function to get comments from database
	$.fn.getComments = () => {
		$.ajax({ 
			url: '/comments', type: 'GET', dataType: 'json',
			success: (data) => {
				let comments = ""
				for (const c of data){
					comments = 
						`<br><div id=comment>` +
							`<div id=name>`+
								c.name +  
							`</div>` + 
							`<div id=message>`+
								c.comment + 
							`</div>` + 
						`<br><hr></div>` +
						comments
				}
				$('#comments').html(comments)
				$('#commentCount').html(data.length + (data.length==1 ? ' comment' : ' comments'))
		}})	
	}

	$(this).getComments()

	// on comment submit
	$('#submitButton').click(()=>{
		$.ajax({ url: '/comments', type: 'POST', 
		data: {
			name: $('#nameBox').val(),
			comment: $('#commentBox').val()
		},
		success: (data) => {
			$(this).getComments()
			$('#nameBox').val('')
			$('#commentBox').val('')
		}
		})		
	})
})