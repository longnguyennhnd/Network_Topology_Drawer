
    var edges = new vis.DataSet([]);
    var nodes = new vis.DataSet([]);

        $(document).ready(function () {
            var listNode = [];
            var listEdge = [];

            $.ajax({
        url: "https://localhost:44344/api/Nodes",
                type: 'GET',
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
        console.log(data);
                    data.forEach(val => {
                        var node = {
        id: val.ID,
                            shape: "image",
                            size: 20,
                            label: val.nameNode,
                            image: "../img/" + val.image,
                            parent: val.parent
                        };
                        var edge = {
        id: val.ID,
                            from: val.ID,
                            to: val.parent
                        };
                        edges.add(edge);
                        nodes.add(node);

                    });

                },
            })
            var container = document.getElementById("mynetwork");

            // provide the data in the vis format
            var data = {
        nodes: nodes,
                edges: edges
            };

            var options = {
        layout: {
        randomSeed: 5,
                },
                nodes: {
        brokenImage: "./broken-image.png",
                },
            };
            // initialize!
            var network = new vis.Network(container, data, options);
            network.on('click', function (properties) {
                var ids = properties.nodes;
                var clickedNodes = nodes.get(ids);
                console.log(clickedNodes);
                document.getElementById("node-id").setAttribute('value', clickedNodes[0].id);
                document.getElementById("node-label").setAttribute('value', clickedNodes[0].label);
                document.getElementById("node-image").setAttribute('value', clickedNodes[0].image);
                document.getElementById("node-parent").setAttribute('value', clickedNodes[0].parent);
            });

        });
        function addNode() {
            try {
        let tmp = {
        ID: document.getElementById("node-id").value,
                    nameNode: document.getElementById("node-label").value,
                    image: document.getElementById("node-image").value,
                    parent: document.getElementById("node-parent").value
                };

                $.ajax({
        type: 'POST',
                    url: 'https://localhost:44344/api/Nodes',
                    data: tmp,
                    dataType: 'json',
                    success: function (data) {
        console.log(data);
                        nodes.add({
        id: document.getElementById("node-id").value,
                            shape: "image",
                            size: 20,
                            label: document.getElementById("node-label").value,
                            image: "../img/" + document.getElementById("node-image").value,
                            parent: document.getElementById("node-parent").value,
                        });
                        edges.add({
        id: document.getElementById("node-id").value,
                            from: document.getElementById("node-id").value,
                            to: document.getElementById("node-parent").value
                        });
                    },
                    error: function (data) {
        console.log('Error', data);
                    }
                });
            } catch (err) {
        console.log(err);
            }
        }
        function updateNode() {
            try {
        let tmp = {
        ID: document.getElementById("node-id").value,
                    nameNode: document.getElementById("node-label").value,
                    image: document.getElementById("node-image").value,
                    parent: document.getElementById("node-parent").value
                };

                $.ajax({
        type: 'PUT',
                    url: 'https://localhost:44344/api/Nodes/' + document.getElementById("node-id").value,
                    data: tmp,
                    dataType: 'json',
                    success: function (data) {
        console.log(data);
                        nodes.update({
        id: document.getElementById("node-id").value,
                            shape: "image",
                            size: 20,
                            label: document.getElementById("node-label").value,
                            image: "../img/" + document.getElementById("node-image").value,
                            parent: document.getElementById("node-parent").value,
                        });
                        edges.update({
        id: document.getElementById("node-id").value,
                            from: document.getElementById("node-id").value,
                            to: document.getElementById("node-parent").value
                        });
                    },
                    error: function (data) {
        console.log('Error', data);
                    }
                });
            } catch (err) {
        console.log(err);
            }
        }
        function removeNode() {
            try {

        $.ajax({
            type: 'DELETE',
            url: 'https://localhost:44344/api/Nodes/' + document.getElementById("node-id").value,
            dataType: 'json',
            success: function (data) {
                nodes.remove({ id: document.getElementById("node-id").value });
                edge.remove({ id: document.getElementById("node-id").value });
            },
            error: function (data) {
                console.log('Error', data);
            }
        });
            } catch (err) {
        alert(err);
            }
        }