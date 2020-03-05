$(document).ready(() => {

	// helper function to get comments from database
	$.fn.getComments = () => {
		$.ajax({ 
			url: '/comments', type: 'GET', dataType: 'json',
			success: (data) => {
				let comments = ""
				for (const c of data)
					comments += c.name + ': ' + c.comment + '<br>'
				$('#testContent').html(comments)
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
		success: (data) => $(this).getComments()
		})		
	})

})