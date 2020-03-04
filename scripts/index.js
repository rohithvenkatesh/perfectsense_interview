$(document).ready(() => {
	console.log("ok")

	$('#commentForm').submit(()=>{
		const comment = $('#commentBox').val()
		console.log(comment)
		$('#testContent').html(comment)
	})

	$('#testButton').click(() => {
		$.ajax({ url: '/database', type: 'GET', dataType: 'json',
		success: (data) => {
			console.log(data)
			$('#testContent').html(
				'<p style="color:white;font-size:46px;">' +
			data.toString() +
			'</p'
			)
		}
		})
	})

})