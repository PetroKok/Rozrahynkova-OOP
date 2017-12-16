let port = 3000;
let socket = io.connect('http://localhost:' + port);
let rotate = 0;
let time;
class Client
{
    constructor()
    {
        let sum = 10;
    }
    static getInfoArr()
    {
        let n = 3, m = 3;
        let mas = [];
        for (let i = 0; i < m; i++)
        {
            mas[i] = [];
            for (let j = 0; j < n; j++)
            {
                mas[i][j] = parseInt($("#"+i+"-"+j).val());
            }
        }
        console.log(mas);
        socket.emit('generate', mas);
    }
    static draw()
    {
        let clear;
        if(rotate === 0)
        {
            clear = [
                [5,3,undefined],
                [1, undefined, undefined],
                [4, undefined,3]
            ];
        }else if(rotate === 90 || rotate === -90)
        {
            clear = [
                [undefined,undefined,3],
                [3, undefined, undefined],
                [5, 1, 4]
            ];
        }
        else if(rotate === 180 || rotate === -180)
        {
            clear = [
                [3, undefined, 4],
                [undefined, undefined, 1],
                [undefined, 3, 5]
            ];
        }
        else if(rotate === 270 || rotate === -270)
        {
            clear = [
                [4,1,5],
                [undefined, undefined, 3],
                [3, undefined, undefined]
            ];
        }
        else if(rotate === 360  || rotate === -360)
        {
            clear = [
                [5,3,undefined],
                [1, undefined, undefined],
                [4, undefined,3]
            ];
            rotate = 0;
        }
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                let e = $("#"+i+"-"+j);
                e.prop('disabled', false);
                e.val(clear[i][j]);
                if(!isNaN(clear[i][j]))
                {
                    //e.prop('disabled', true);
                }
            }
        }
    }
    static sendArr(arr)
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                $("#"+i+"-"+j).val(arr[i][j]);
            }
        }
        let suc = arr[0][0] + arr[1][0] + arr[2][0];
        document.getElementById('result').innerHTML = "Sum is: " + suc;
    }
}
socket.on('sendArr', (arr)=>
{
    Client.sendArr(arr);
    console.log((Date.now() - time)/1000);
});
$(document).on('click', '#generate', ()=>
{
    Client.getInfoArr();
    time = Date.now();
});
$(document).on('click', '#clear', ()=>
{
    Client.draw();
});
$(document).on('click' , '#left', ()=>
{
    rotate -= 90;
    Client.draw();
});
$(document).on('click' , '#right', ()=>
{
    rotate += 90;
    Client.draw();
});
$(document).keypress((e)=>
{
    if(e.which === 13) {
        Client.getInfoArr();
    }
});
