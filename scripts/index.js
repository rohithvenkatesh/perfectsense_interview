$(document).ready(() => {
	var allComments = {}
	// helper function to get comments from database
	$.fn.getComments = () => {
		$.ajax({ 
			url: '/comments', type: 'GET', dataType: 'json',
			success: (data) => {
				let comments = ""
				commentCount = 0
				for (const c of data){
					commentCount++;
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
				$('#commentCount').html(commentCount + ' comments')
		}})	
	}
	// $.fn.getCurrentpk = ()=>{
	// 	$.ajax({ 
	// 		url: '/comments', type: 'GET', dataType: 'json',
	// 		success: (data) => {
	// 			return data[data.]
	// 		}
	// 	})
	// }
	$(this).getComments()

	// on comment submit
	$('#submitButton').click(()=>{
		$.ajax({ url: '/comments', type: 'POST', 
		data: {
			name: $('#nameBox').val(),
			comment: $('#commentBox').val()
		},
		success: (data) => {
			allComments[data.pk] = {}
			$(this).getComments()
			$('#nameBox').val('')
			$('#commentBox').val('')
		}
		})		
	})

})