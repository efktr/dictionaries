class TSVReader {
    constructor(){
        this.data = [];
    }

    read(path= null, data= null, keys= null, callback){
        let self = this;
        callback = callback || function(){};

        let parse = (data, keys) => {
            if(data !== null){
                data = data.split(/\n/);

                if(keys === null){
                    keys = data[0].split(/\t/);
                    data = data.slice(1, data.length);
                }

                self.data = data
                    .map(line => {
                        line = line.split(/\t/);
                        let result = {};
                        for(let i=0; i<keys.length; i++){
                            result[keys[i]] = line[i]
                        }

                        return result;
                    })
                    .filter(e => e !== null && e !== undefined);

                return callback();
            } else {
                return callback();
            }
        };

        if(path !== null){
            let client = new XMLHttpRequest();
            client.open('GET', path);
            client.onreadystatechange = function() {
                data = client.responseText;
                return parse(data, keys);
            };
            client.send();
        } if (data !== null){
            return parse(data, keys);
        } else {
            return callback();
        }
    }

    toSting(){
        let keys = Object.keys(data[0]);
        let result = keys.join("\t");

        result += '\n';

        result += this.data
            .map(x => {
                return Object.values(x).join("\t");
            })
            .join("\n");

        return result;
    }

    getData(){
        return this.data;
    }
}

export default TSVReader;