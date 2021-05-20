// noinspection HtmlUnknownAttribute

const NUMBER_OF_ROWS = 230 // nur gerade Zahlen

const MAX_NUMBER_OF_ROWS_TO_SHOW_ALL_CIRCLES = 6

const DISPLAY_TIME_FOR_ONE_DIFFUSION_STEP = 0.02

const NUMBER_OF_DIFFUSION_STEPS = 5200

const DURATION_DIFFUSION = DISPLAY_TIME_FOR_ONE_DIFFUSION_STEP * NUMBER_OF_DIFFUSION_STEPS

const NUMBER_OF_COLUMNS = NUMBER_OF_ROWS;

const page_height = 150;

const page_width = 250;

let  sphere_radius = 0.0;

let tentative_sphere_radius = page_height / ((NUMBER_OF_ROWS) * Math.sqrt(3));

let tentative_delta_x = tentative_sphere_radius;

let tentative_delta_y = tentative_sphere_radius * Math.tan(Math.PI / 6);

// the delta_x and delta_y mean the shift of the crystal layers in x and y direction

// Time management of this webpage 

// all times are taken in seconds 

let time_list = [0.0]

const DURATION_SHOWING_BLANK_LEFT_LEGEND = 0.5

const TIME_SHOWING_B_CIRCLE_LEFT_LEGEND = time_list[0] + DURATION_SHOWING_BLANK_LEFT_LEGEND

time_list.push(TIME_SHOWING_B_CIRCLE_LEFT_LEGEND) // time_list[1]

const DURATION_CONSTRUCTION_LAYER_B = 0.7

const TIME_SHOWING_C_CIRCLE_LEFT_LEGEND = time_list[1] + DURATION_CONSTRUCTION_LAYER_B

time_list.push(TIME_SHOWING_C_CIRCLE_LEFT_LEGEND) // time_list[2]

const DURATION_CONSTRUCTION_LAYER_C = 0.7

const TIME_SHOWING_START_CIRCLE_LEFT_LEGEND = time_list[2] + DURATION_CONSTRUCTION_LAYER_C

time_list.push(TIME_SHOWING_START_CIRCLE_LEFT_LEGEND) // time_list[3]

const TIME_ANIMATION_START_CIRCLE_SCALE = time_list[3] + 0.5

time_list.push(TIME_ANIMATION_START_CIRCLE_SCALE) // time_list[4]

const DURATION_SCALE_START_CIRCLE = 2

const TIME_ANIMATION_START_CIRCLE_TRANSLATE = time_list[4] + DURATION_SCALE_START_CIRCLE

time_list.push(TIME_ANIMATION_START_CIRCLE_TRANSLATE) // time_list[5]

const DURATION_TRANSLATE_START_CIRCLE = 3

const TIME_START_CIRCLE_ARRIVED_IN_THE_MIDDLE = time_list[5] + DURATION_TRANSLATE_START_CIRCLE

time_list.push(TIME_START_CIRCLE_ARRIVED_IN_THE_MIDDLE) // time_list[6]

const TIME_TO_START_DIFFUSION = TIME_START_CIRCLE_ARRIVED_IN_THE_MIDDLE + 0.5

time_list.push(TIME_TO_START_DIFFUSION) // time_list[7]

const TIME_DIFFUSION_FINISHED = time_list[7] + DURATION_DIFFUSION

time_list.push(TIME_DIFFUSION_FINISHED) // time_list[8]

const x_margin_left_legend = 2.0;

const y_coordinate_left_legend_start_position = 105;

const y_coordinate_left_legend_actual_position = 113;

const sphere_radius_legend = 1.5;

const y_coordinate_chemical_education = 125;


const ELECTRON_CHARGE = 1.6019 * Math.pow(10, -19)

const DIFFUSION_ACTIVATION_ENERGY = 0.1

const K_BOLTZMANN = 1.3807 * Math.pow(10, -23)

const PREEXPFACTOR_DIFFUSION = 5 * Math.pow(10, 12)

const TEMPERATURE = 60



const single_adsorbate_diffusion_time = 1 / (PREEXPFACTOR_DIFFUSION * Math.exp(-(ELECTRON_CHARGE * DIFFUSION_ACTIVATION_ENERGY) / (K_BOLTZMANN * TEMPERATURE)));


let mc_time = 0.0

let four_corner_circles_B = [
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0]
];

// four_corner_circles_B[1][1] means the x coordinaten of the the upper left point

// four_corner_circles_B[1][2] means the 2 coordinaten of the the upper left point

// four_corner_circles_B[2][1] means the 2 coordinaten of the the lower  left point and so on



let four_corner_circles_C = [
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0],
    [0.0, 0.0, 0.0]
];



function round_num_decim(value,num_of_decimals)
{
let return_value =    Math.round(value *  Math.pow(10,num_of_decimals) ) / Math.pow(10,num_of_decimals);

return(return_value);

}


function determine_the_sphere_radius(number_of_rows, number_of_columns) {


    const largest_extension_in_x_direction = tentative_delta_x + tentative_delta_x + tentative_sphere_radius + (((number_of_columns - 1) + ((number_of_rows - 1) / 2.0)) * (tentative_sphere_radius * 2)) + tentative_sphere_radius;

    //  see comments for the largest extension in y direction

    const largest_extension_in_y_direction = tentative_delta_y + tentative_delta_y + tentative_sphere_radius + ((number_of_rows - 1) * tentative_sphere_radius * Math.sqrt(3)) + tentative_sphere_radius;

    // there is two times delta_y because we calculate for the adsorbate layer
    // one delta y would be enough to come from the B-layer to the C - layer
    // the next delta y is to from the C-layer to the adsorbate layer
    // the tentative_sphere_radius at the end is to come from from the center of the lowest row (highest i index) to the the edge of the lowest row sphere





    const correction_fator_x = largest_extension_in_x_direction / page_width;

    const correction_fator_y = largest_extension_in_y_direction / page_height;

    if (correction_fator_x > correction_fator_y) {

        sphere_radius = tentative_sphere_radius / correction_fator_x;

    }


    if (correction_fator_y > correction_fator_x) {

        sphere_radius = tentative_sphere_radius / correction_fator_y;

    }

    sphere_radius = Math.round(sphere_radius * 100) / 100




}

determine_the_sphere_radius(NUMBER_OF_ROWS, NUMBER_OF_COLUMNS);


const delta_x = Math.round(sphere_radius * 100) / 100;

const delta_y = Math.round(sphere_radius * Math.tan(Math.PI / 6) * 100) / 100;


const ratio_radii = sphere_radius / sphere_radius_legend







function determine_the_corner_points_B_parallelogram(page_height, page_width, number_of_rows) {

    let number_of_columns = number_of_rows;

    sphere_radius = delta_x;

    //const delta_y = sphere_radius * Math.tan(Math.PI / 6);

    let x_coordinate,y_coordinate;

    let i,j;



    for ( i = 1; i <= number_of_rows; i++) {

        for ( j = 1; j <= number_of_columns; j++) {

             x_coordinate = Math.round((sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2)) * 10) / 10;

            // the upper line is the shift of each row with index i >1

             y_coordinate = Math.round((sphere_radius + ((i - 1) * sphere_radius * Math.sqrt(3))) * 10) / 10;


            if (i === 1 && j === 1) {

                four_corner_circles_B[1][1] = x_coordinate;
                four_corner_circles_B[1][2] = y_coordinate;

            }

            if (i === number_of_rows && j === 1) {

                four_corner_circles_B[2][1] = x_coordinate;
                four_corner_circles_B[2][2] = y_coordinate;

            }

            if (i === number_of_rows && j === number_of_columns) {

                four_corner_circles_B[3][1] = x_coordinate;
                four_corner_circles_B[3][2] = y_coordinate;

            }


            if (i === 1 && j === number_of_columns) {

                four_corner_circles_B[4][1] = x_coordinate;
                four_corner_circles_B[4][2] = y_coordinate;

            }



        }

    }



}

determine_the_corner_points_B_parallelogram(page_height, page_width, NUMBER_OF_ROWS);

 let the_B_layer = " ";





function write_B_layer() {

    let x_coordinate_B ;

    let y_coordinate_B ;

    let time_for_parallelogram;

    let i,j;

    the_B_layer += "<g style=\"visibility:hidden\">\n"

    const time_for_one_row = round_num_decim( DURATION_CONSTRUCTION_LAYER_B / NUMBER_OF_ROWS,2);

    const time_for_one_atom = round_num_decim( time_for_one_row / NUMBER_OF_ROWS,2) ;





    let time_for_this_atom;

    let one_B_circle_raw =
        "<circle class=\"B_circle\" cx=\"x_coordinate_B\"  cy=\"y_coordinate_B\"  r=\"sphere_radius\">\n" +
        "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\"time_for_this_atom\"" +
        " dur=\"DURATION_CONSTRUCTION_LAYER_B\" s fill=\"freeze\" />\n" +
        "</circle>";

    // write all circles
    if (NUMBER_OF_ROWS <= MAX_NUMBER_OF_ROWS_TO_SHOW_ALL_CIRCLES) {

        for (i = 1; i <= NUMBER_OF_ROWS; i++) {
            for (j = 1; j <= NUMBER_OF_COLUMNS; j++) {

                x_coordinate_B = round_num_decim(sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2),2);

                y_coordinate_B = round_num_decim(sphere_radius + ((i - 1) * sphere_radius * Math.sqrt(3)),2);

                time_for_this_atom =round_num_decim (time_list[1] + (i - 1) * time_for_one_row + j * time_for_one_atom,2) ;

                one_B_circle = one_B_circle_raw.replace("x_coordinate_B",x_coordinate_B).
                replace("y_coordinate_B",y_coordinate_B).
                replace("sphere_radius",sphere_radius).
                replace("time_for_this_atom",time_for_this_atom).
                replace("DURATION_CONSTRUCTION_LAYER_B",DURATION_CONSTRUCTION_LAYER_B);

                the_B_layer += one_B_circle;



            }
        }



    }

    // die Bahlsen Kekse
    else {

        let time_for_parallelogram = round_num_decim( time_list[1] + (NUMBER_OF_ROWS - 1) * time_for_one_row + (NUMBER_OF_ROWS - 1) * time_for_one_atom,2);

        for ( i = 1; i <= NUMBER_OF_ROWS; i++) {
            for ( j = 1; j <= NUMBER_OF_COLUMNS; j++) {
            // jetzt schreibt er die Balsen Kekse die Verzahnung am Rand
                if (i < 2 || j < 2 || i > NUMBER_OF_ROWS - 1 || j > NUMBER_OF_COLUMNS - 1) {

                    x_coordinate_B = round_num_decim(sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2),2) ;

                    y_coordinate_B = round_num_decim(sphere_radius + ((i - 1) * sphere_radius * Math.sqrt(3)),2) ;

                    time_for_this_atom = round_num_decim(time_list[1] + (i - 1) * time_for_one_row + j * time_for_one_atom,2);

                    one_B_edge_circle = one_B_circle_raw.replace("x_coordinate_B",x_coordinate_B).
                    replace("y_coordinate_B",y_coordinate_B).
                    replace("sphere_radius",sphere_radius).
                    replace("time_for_this_atom",time_for_this_atom).
                    replace("DURATION_CONSTRUCTION_LAYER_B",DURATION_CONSTRUCTION_LAYER_B);

                    the_B_layer += one_B_edge_circle;


                }
            }
        }


        let left_upper_x = four_corner_circles_B[1][1];
        let left_upper_y = four_corner_circles_B[1][2];
        let left_lower_x = four_corner_circles_B[2][1];
        let left_lower_y = four_corner_circles_B[2][2];
        let right_lower_x = four_corner_circles_B[3][1];
        let right_lower_y = four_corner_circles_B[3][2];
        let right_upper_x = four_corner_circles_B[4][1];
        let right_upper_y = four_corner_circles_B[4][2];


        let the_B_parallelogram_raw =
        "<path d=\"M left_upper_x left_upper_y, " +
            "L left_lower_x left_lower_y," +
            "L right_lower_x  right_lower_y," +
            "L right_upper_x  right_upper_y," +
            "Z\" " +
            "class =" +
            "\"B_line\">\n" +

            "<set\ " +
        "attributeName = \"visibility\" attributeType = \"CSS\"\n" +
            "to=\"visible\" begin = \"time_for_parallelograms\"  dur=\"DURATION_CONSTRUCION_LAYER_Bs\"\n" +
            " fill=\"freeze\"/>\n"+
        "</path> ";


        the_B_parallelogram = the_B_parallelogram_raw.
        replace("left_upper_x",left_upper_x).
        replace("left_upper_y",left_upper_y).
        replace("left_lower_x",left_lower_x).
        replace("left_lower_y",left_lower_y).
        replace ("right_lower_x",right_lower_x).
        replace("right_lower_y",right_lower_y).
        replace("right_upper_x",right_upper_x).
        replace("right_upper_y",right_upper_y).
        replace("time_for_parallelogram",time_for_parallelogram).
        replace("DURATION_CONSTRUCION_LAYER_B",DURATION_CONSTRUCTION_LAYER_B) ;

       let  the_B_layer_temp = the_B_layer + the_B_parallelogram +  "</g>\n"

        the_B_layer = the_B_layer_temp


    }


}


write_B_layer();


document.getElementById("substrate layer B").innerHTML = the_B_layer;





function determine_the_corner_points_C_parallelogram(page_height, page_width, number_of_rows) {

    let number_of_columns = number_of_rows;

    let x_coordinate,y_coordinate;

    let i,j;



    let delta_x = sphere_radius;

    let delta_y = sphere_radius * Math.tan(Math.PI / 6);



    for (i = 1; i <= number_of_rows; i++) {

        for (j = 1; j <= number_of_columns; j++) {

            x_coordinate = Math.round((delta_x + (sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2))) * 10) / 10;
            // the upper line is the shift of each row with index i >1


            y_coordinate = Math.round((delta_y + ((sphere_radius + ((i - 1) * sphere_radius * Math.sqrt(3))))) * 10) / 10;




            if (i === 1 && j === 1) {

                four_corner_circles_C[1][1] = x_coordinate;
                four_corner_circles_C[1][2] = y_coordinate;



            }

            if (i === number_of_rows && j === 1) {

                four_corner_circles_C[2][1] = x_coordinate;
                four_corner_circles_C[2][2] = y_coordinate;

            }

            if (i === number_of_rows && j === number_of_columns) {

                four_corner_circles_C[3][1] = x_coordinate;
                four_corner_circles_C[3][2] = y_coordinate;

            }


            if (i === 1 && j === number_of_columns) {

                four_corner_circles_C[4][1] = x_coordinate;
                four_corner_circles_C[4][2] = y_coordinate;

            }



        }

    }



}

determine_the_corner_points_C_parallelogram(page_height, page_width, NUMBER_OF_ROWS);






const the_start_position = [0.0, 0.0, 0.0]; // the start_position[1] is the x coordinate, the start position[2] is the y coordinate

let i_initial = NUMBER_OF_ROWS / 2

let j_initial = NUMBER_OF_ROWS / 2

let i_final = 0;

let j_final = 0


let the_C_layer = " ";


function write_C_layer() {

    let x_coordinate_C;

    let y_coordinate_C;

    let i,j;

    the_C_layer += "<g style=\"visibility:hidden\">\n"

    const time_for_one_row = round_num_decim(DURATION_CONSTRUCTION_LAYER_C / NUMBER_OF_ROWS,2);

    let time_for_one_atom = round_num_decim(time_for_one_row / NUMBER_OF_COLUMNS,2);

    let time_for_parallelogram;

    let time_for_this_atom;

    let one_C_circle_raw =
        "<circle class=\"C_circle\" " +
        "cx=\"x_coordinate_C\"  cy=\"y_coordinate_C\" r= \"sphere_radius\">\n" +
        "<set  attributeName=\"visibility\" attributeType=\"CSS\" " +
        "to=\"visible\" begin=\"time_for_this_atoms\"" +
        " dur=\"DURATION_CONSTRUCTION_LAYER_C\" s   " +
        "fill=\"freeze\"></set>\n" +
        "</circle>" ;

    // write all circles
    if (NUMBER_OF_ROWS < MAX_NUMBER_OF_ROWS_TO_SHOW_ALL_CIRCLES) {

        for ( i = 1; i <= NUMBER_OF_ROWS; i++) {
            for ( j = 1; j <= NUMBER_OF_COLUMNS; j++) {

                x_coordinate_C = round_num_decim(delta_x + sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2),2);

                y_coordinate_C = round_num_decim(delta_y + sphere_radius + ((i - 1) * sphere_radius * Math.sqrt(3)),2);

                time_for_this_atom = round_num_decim(time_list[2] + (i - 1) * time_for_one_row + j * time_for_one_atom,2);


               one_C_circle = one_C_circle_raw.replace("x_coordinate_C",x_coordinate_C).
               replace("y_coordinate_C",y_coordinate_C).
               replace("sphere_radius",sphere_radius).
               replace("time_for_this_atom",time_for_this_atom).
               replace("DURATION_CONSTRUCTION_LAYER_C",DURATION_CONSTRUCTION_LAYER_C);

               the_C_layer += one_C_circle;



                }


            }
        }


    // die Bahlsen Kekse
    else {

        let  time_for_parallelogram = round_num_decim( time_list[2] + (NUMBER_OF_ROWS - 1) * time_for_one_row +
            (NUMBER_OF_ROWS - 1) * time_for_one_atom,2);

        for ( i = 1; i <= NUMBER_OF_ROWS; i++) {
            for ( j = 1; j <= NUMBER_OF_COLUMNS; j++) {
                // jetzt schreibt er die Balsen Kekse die Verzahnung am Rand
                if (i < 2 || j < 2 || i > NUMBER_OF_ROWS - 1 || j > NUMBER_OF_COLUMNS - 1) {

                    x_coordinate_C = round_num_decim(delta_x + (sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2)),2) ;

                    // the upper line is the shift of each row with index i >1 the delta_x makes the difference

                    y_coordinate_C = round_num_decim(delta_y + ((sphere_radius +  ((i - 1) * sphere_radius * Math.sqrt(3)))),2);
                    // the delta _y makes the difference to B

                    time_for_this_atom = round_num_decim(time_list[1] + (i - 1) * time_for_one_row + j * time_for_one_atom,2);

                    one_C_edge_circle = one_C_circle_raw.replace("x_coordinate_C",x_coordinate_C).
                    replace("y_coordinate_C",y_coordinate_C).
                    replace("sphere_radius",sphere_radius).
                    replace("time_for_this_atom",time_for_this_atom).
                    replace("DURATION_CONSTRUCTION_LAYER_C",DURATION_CONSTRUCTION_LAYER_C);

                    the_C_layer += one_C_edge_circle;

                }
            }
        }

        let left_upper_x = four_corner_circles_C[1][1];
        let left_upper_y = four_corner_circles_C[1][2];
        let left_lower_x = four_corner_circles_C[2][1];
        let left_lower_y = four_corner_circles_C[2][2];
        let right_lower_x = four_corner_circles_C[3][1];
        let right_lower_y = four_corner_circles_C[3][2];
        let right_upper_x = four_corner_circles_C[4][1];
        let right_upper_y = four_corner_circles_C[4][2];

        let the_C_parallelogram_raw =
            "<path d= \"M left_upper_x left_upper_y,\n" +
            "L left_lower_x left_lower_y,\n" +
            "L right_lower_x  right_lower_y,\n" +
            "L right_upper_x  right_upper_y,\n" +
            " z \"  \n" +
            "class =" +
            "\"C_line\">\n" +

            "<set\ " +
            "attributeName = \"visibility\" attributeType = \"CSS\"\n" +
            "to=\"visible\" begin = \"time_for_parallelograms\"  dur=\"DURATION_CONSTRUCION_LAYER_Cs\"\n" +
            " fill=\"freeze\"/>\n"+
            "</path> ";



        the_C_parallelogram = the_C_parallelogram_raw.
        replace("left_upper_x",left_upper_x).
        replace("left_upper_y",left_upper_y).
        replace("left_lower_x",left_lower_x).
        replace("left_lower_y",left_lower_y).
        replace ("right_lower_x",right_lower_x).
        replace("right_lower_y",right_lower_y).
        replace("right_upper_x",right_upper_x).
        replace("right_upper_y",right_upper_y).
        replace("time_for_parallelogram",time_for_parallelogram).
        replace("DURATION_CONSTRUCION_LAYER_C",DURATION_CONSTRUCTION_LAYER_C) ;

       let the_C_layer_temp = the_C_layer + the_C_parallelogram + "</g>\n";

        the_C_layer = the_C_layer_temp;



    }



}

write_C_layer()



document.getElementById("substrate layer C").innerHTML = the_C_layer;






function determine_start_position() {


    let x_coordinate,y_coordinate;

    x_coordinate = Math.round((delta_x + delta_x + sphere_radius + ((j_initial - 1) + (i_initial - 1) / 2.0) * (sphere_radius * 2)) * 100) / 100

    y_coordinate = Math.round((delta_y + delta_y + sphere_radius + ((i_initial - 1) * sphere_radius * Math.sqrt(3))) * 100) / 100

    the_start_position[1] = x_coordinate

    the_start_position[2] = y_coordinate

    // we added an additional delta_x and delta_y because the start position is on the adsorbate layer.




}


determine_start_position()






let the_left_bottom_legend = "";


function write_the_left_bottom_legend() {

    const y_coor_B = 89.0;

    const y_coor_C = 97.0;

    const y_coor_start = 105.0;

    const y_coor_actual = y_coordinate_left_legend_actual_position;

    let x_margin = x_margin_left_legend;

    const x_coor_text = 5.6;

    
    const text_y_shift = 1.5;

    the_left_bottom_legend += "<g style=\"visibility:hidden\">\n"

    the_left_bottom_legend += "<circle class=\"B_circle\"  cx=\"";

    the_left_bottom_legend += x_margin;

    the_left_bottom_legend += "\"cy=\"";

    the_left_bottom_legend += y_coor_B;

    the_left_bottom_legend += "\" r=\"";

    the_left_bottom_legend += sphere_radius_legend;

    the_left_bottom_legend += "\" /> \n"

    the_left_bottom_legend += "<text class=\"legend_text\" x=\"";

    the_left_bottom_legend += x_coor_text;

    the_left_bottom_legend += "\" y=\"";

    the_left_bottom_legend += y_coor_B + text_y_shift;

    the_left_bottom_legend += "\" >\n "

    the_left_bottom_legend += "layer B\n";

    the_left_bottom_legend += "</text>\n";

    the_left_bottom_legend += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_left_bottom_legend += time_list[1]

    the_left_bottom_legend += "s\" dur=\""

    the_left_bottom_legend += DURATION_CONSTRUCTION_LAYER_B

    the_left_bottom_legend += "\"s fill=\"freeze\" />\n"

    the_left_bottom_legend += "</g>\n\n\n"



    the_left_bottom_legend += "<g style=\"visibility:hidden\">\n"

    the_left_bottom_legend += "<circle class=\"legend_circle C_circle\"  cx=\"";

    the_left_bottom_legend += x_margin;

    the_left_bottom_legend += "\"cy=\"";

    the_left_bottom_legend += y_coor_C;

    the_left_bottom_legend += "\" r=\"";

    the_left_bottom_legend += sphere_radius_legend;

    the_left_bottom_legend += "\" /> \n"

    the_left_bottom_legend += "<text class=\"legend_text\" x=\"";

    the_left_bottom_legend += x_coor_text;

    the_left_bottom_legend += "\" y=\"";

    the_left_bottom_legend += y_coor_C + text_y_shift;

    the_left_bottom_legend += "\" >\n "

    the_left_bottom_legend += "layer C\n";

    the_left_bottom_legend += "</text>\n";

    the_left_bottom_legend += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_left_bottom_legend += time_list[2]

    the_left_bottom_legend += "s\" dur=\""

    the_left_bottom_legend += DURATION_CONSTRUCTION_LAYER_C

    the_left_bottom_legend += "\"s fill=\"freeze\" />\n"

    the_left_bottom_legend += "</g>\n\n\n"








    the_left_bottom_legend += "<defs>\n"

    the_left_bottom_legend += "<g id=\"circle legend with cross\">\n"

    the_left_bottom_legend += "<circle cx=\"0.0\" cy=\"0.0\" r=\""

    the_left_bottom_legend += sphere_radius_legend

    the_left_bottom_legend += "\"/> \n"

    the_left_bottom_legend += "<line x1=\"0\" y1=\""

    the_left_bottom_legend += sphere_radius_legend

    the_left_bottom_legend += "\" x2=\"0\" y2=\"-"

    the_left_bottom_legend += sphere_radius_legend

    the_left_bottom_legend += "\"/>\n"

    the_left_bottom_legend += "<line x1=\"-"

    the_left_bottom_legend += sphere_radius_legend

    the_left_bottom_legend += "\" y1=\"0\"  x2=\""

    the_left_bottom_legend += sphere_radius_legend

    the_left_bottom_legend += "\" y2=\"0\"/>\n"

    the_left_bottom_legend += "</g>\n"

    the_left_bottom_legend += "</defs>\n\n"





    the_left_bottom_legend += "<g style=\"visibility:hidden\">\n"

    the_left_bottom_legend += "<use xlink:href=\"#circle legend with cross\" x=\""

    the_left_bottom_legend += x_margin

    the_left_bottom_legend += "\" y=\""

    the_left_bottom_legend += y_coor_start

    the_left_bottom_legend += "\" class=\" legend_circle start_position_circle\" />\n "


    the_left_bottom_legend += "<text class=\"legend_text\"  x=\"";

    the_left_bottom_legend += x_coor_text;

    the_left_bottom_legend += "\" y=\"";

    the_left_bottom_legend += y_coor_start + text_y_shift;

    the_left_bottom_legend += "\" >\n "

    the_left_bottom_legend += "start position\n";

    the_left_bottom_legend += "</text>\n";

    the_left_bottom_legend += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_left_bottom_legend += time_list[3]

    the_left_bottom_legend += "s\" dur=\""

    the_left_bottom_legend += DURATION_TRANSLATE_START_CIRCLE

    the_left_bottom_legend += "\"s fill=\"freeze\" />\n"

    the_left_bottom_legend += "</g>\n\n"




    the_left_bottom_legend += "<g style=\"visibility:hidden\">\n"

    // wir konnen hier nicht die ganze Gruppe drehen weil der Text noch mit dabei ist.

    the_left_bottom_legend += "<use xlink:href=\"#circle legend with cross\" x=\""

    the_left_bottom_legend += x_margin

    the_left_bottom_legend += "\" y=\""

    the_left_bottom_legend += y_coor_actual

    the_left_bottom_legend += "\" transform=\"rotate(45,"

    the_left_bottom_legend += x_margin

    the_left_bottom_legend += ","

    the_left_bottom_legend += y_coor_actual

    the_left_bottom_legend += ")\""

    the_left_bottom_legend += "\" class=\"legend_circle actual_position_circle\" />\n"


    the_left_bottom_legend += "<text class=\"legend_text\" x=\"";

    the_left_bottom_legend += x_coor_text;

    the_left_bottom_legend += "\" y=\"";

    the_left_bottom_legend += y_coor_actual + text_y_shift;

    the_left_bottom_legend += "\" >\n "

    the_left_bottom_legend += "actual position\n";

    the_left_bottom_legend += "</text>\n";

    the_left_bottom_legend += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_left_bottom_legend += TIME_TO_START_DIFFUSION

    the_left_bottom_legend += "s\" dur=\""

    the_left_bottom_legend += DURATION_DIFFUSION

    the_left_bottom_legend += "\"s fill=\"freeze\" />\n"

    the_left_bottom_legend += "</g>\n\n"



    the_left_bottom_legend += "<g id=\"j_chem_edu\" style=\"visibility:hidden\" >"

    the_left_bottom_legend += "<a xlink:href=\"https://pubs.acs.org/doi/abs/10.1021/acs.jchemed.6b01008\">"

    the_left_bottom_legend += "<image xlink:href=\"svg/journal_chemical_education.gif\" height=\"8.4\" width=\"50\" transform=\"translate("

    the_left_bottom_legend += x_margin_left_legend

    the_left_bottom_legend += ","

    the_left_bottom_legend += y_coordinate_chemical_education

    the_left_bottom_legend += ") scale(1.3)\" /> \n"

    the_left_bottom_legend += "</a>\n"

    the_left_bottom_legend += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_left_bottom_legend += TIME_DIFFUSION_FINISHED

    the_left_bottom_legend += "s\" fill=\"freeze\" />\n"

    the_left_bottom_legend += "</g>\n\n"


}


write_the_left_bottom_legend();





document.getElementById("write the bottom left legend").innerHTML = the_left_bottom_legend;

let definition_start_circle = ""

function define_start_circle() {

    definition_start_circle += "<circle cx=\"0.0\" cy=\"0.0\" r=\""

    definition_start_circle += sphere_radius

    definition_start_circle += "\" /> \n"

    definition_start_circle += "<line x1=\"0\" y1=\""

    definition_start_circle += sphere_radius

    definition_start_circle += "\" x2=\"0\" y2=\"-"

    definition_start_circle += sphere_radius

    definition_start_circle += "\"/>\n"

    definition_start_circle += "<line x1=\"-"

    definition_start_circle += sphere_radius

    definition_start_circle += "\" y1=\"0\"  x2=\""

    definition_start_circle += sphere_radius

    definition_start_circle += "\" y2=\"0\"/>\n"

}

define_start_circle();



document.getElementById("start circle").innerHTML = definition_start_circle




let definition_actual_circle = ""

function define_actual_circle() {

   // let defintion_actual_circle;

    //	definition_actual_circle += "<defs>\n"

    //definition_actual_circle += "<g id=\"actual circle\" style=\"stroke:rgb(0,0,0); stroke-width:0.4; fill:rgb(255,255,255);opacity:1.0;\" transform=\"rotate(45,0,0)\" >\n"

    definition_actual_circle += "<circle cx=\"0.0\" cy=\"0.0\" r=\""

    definition_actual_circle += sphere_radius

    definition_actual_circle += "\" /> \n"

    definition_actual_circle += "<line x1=\"0\" y1=\""

    definition_actual_circle += sphere_radius

    definition_actual_circle += "\" x2=\"0\" y2=\"-"

    definition_actual_circle += sphere_radius

    definition_actual_circle += "\"/>\n"

    definition_actual_circle += "<line x1=\"-"

    definition_actual_circle += sphere_radius

    definition_actual_circle += "\" y1=\"0\"  x2=\""

    definition_actual_circle += sphere_radius

    definition_actual_circle += "\" y2=\"0\"/>\n"

    //definition_actual_circle += "</g>\n"

    //	definition_actual_circle += "</defs>\n\n"

}

define_actual_circle();




document.getElementById("actual circle").innerHTML = definition_actual_circle










let the_start_position_animation = "";

function write_start_position_animation() {

    let delta_x,delta_y;

    delta_x = the_start_position[1] - x_margin_left_legend

    delta_y = the_start_position[2] - y_coordinate_left_legend_start_position

    the_start_position_animation += "<g style=\"stroke:rgb(0,0,255); stroke-width:0.1; fill:rgb(255,255,255);opacity:1.0; visibility:hidden\" transform=\"translate("

    the_start_position_animation += x_margin_left_legend

    the_start_position_animation += ","

    the_start_position_animation += y_coordinate_left_legend_start_position

    the_start_position_animation += ")\">\n"

    the_start_position_animation += "<circle cx=\"0.0\" cy=\"0.0\" r=\""

    the_start_position_animation += sphere_radius_legend

    the_start_position_animation += "\"/> \n"

    the_start_position_animation += "<line x1=\"0\" y1=\""

    the_start_position_animation += sphere_radius_legend

    the_start_position_animation += "\" x2=\"0\" y2=\"-"

    the_start_position_animation += sphere_radius_legend

    the_start_position_animation += "\"/>\n"

    the_start_position_animation += "<line x1=\"-"

    the_start_position_animation += sphere_radius_legend

    the_start_position_animation += "\" y1=\"0\"  x2=\""

    the_start_position_animation += sphere_radius_legend

    the_start_position_animation += "\" y2=\"0\"/>\n"

    the_start_position_animation += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" additive=\"sum\" begin=\""

    the_start_position_animation += time_list[4]

    the_start_position_animation += "s\" dur=\"1s\" fill=\"freeze\"/>\n"

    the_start_position_animation += "<animateTransform attributeName=\"transform\" attributeType=\"XML\" type=\"scale\" from=\"0\" to=\""

    the_start_position_animation += ratio_radii

    the_start_position_animation += "\" additive=\"sum\" begin=\""

    the_start_position_animation += time_list[5]

    the_start_position_animation += "s\" dur=\"1s\" fill=\"freeze\"/>\n"

    the_start_position_animation += "<animateMotion from=\"0 0\" to=\""

    the_start_position_animation += delta_x

    the_start_position_animation += " "

    the_start_position_animation += delta_y

    the_start_position_animation += "\""

    the_start_position_animation += " additive=\"sum\" begin=\""

    the_start_position_animation += time_list[5]

    the_start_position_animation += "s\" dur=\""

    the_start_position_animation += DURATION_TRANSLATE_START_CIRCLE

    the_start_position_animation += "s\" fill=\"freeze\"/> \n"

    the_start_position_animation += "</g>\n"


}

write_start_position_animation();



document.getElementById("start position animation").innerHTML = the_start_position_animation









let the_permanent_start_position = "";

function write_permanent_start_position() {



    the_permanent_start_position += "<defs>\n"

    the_permanent_start_position += "<g id=\"permanent start circle in the center\" style=\"stroke:rgb(0,0,255); stroke-width:0.4; fill:rgb(255,255,255); visibility:hidden; \" >\n"


    the_permanent_start_position += "<use xlink:href=\" \" > \n"

    the_permanent_start_position += "</defs>\n\n"


    the_permanent_start_position += "<g style=\"visbility:hidden\">\n"

    the_permanent_start_position += "<use xlink:href=\"#permanent start circle in the center\" x=\""

    the_permanent_start_position += the_start_position[1]

    the_permanent_start_position += "\" y=\""

    the_permanent_start_position += the_start_position[2]

    the_permanent_start_position += "\"/>\n"

    the_permanent_start_position += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_permanent_start_position += TIME_TO_START_DIFFUSION

    the_permanent_start_position += "s\" dur=\""

    the_permanent_start_position += DURATION_DIFFUSION

    the_permanent_start_position += "\"s fill=\"freeze\" />\n"

    the_permanent_start_position += "</g>\n\n"



}

write_permanent_start_position();



document.getElementById("the permanent start position").innerHTML = the_permanent_start_position;




let adatom_lattice = "";

function write_adatom_lattice() {

    // this function is only used for control purposes.

    let x_coordinate,y_coordinate;

    let i,j;

     x_coordinate = 0.0;

     y_coordinate = 0.0;

    let id_circle = "";






    for (i = 1; i <= NUMBER_OF_ROWS; i++) {

        for (j = 1; j <= NUMBER_OF_COLUMNS; j++) {


            id_circle = "(";
            id_circle += i
            id_circle += ","
            id_circle += j
            id_circle += ")"



            // it is two times delta because it is the adsorbate layer

            x_coordinate = Math.round((delta_x + delta_x + sphere_radius + ((j - 1) + (i - 1) / 2.0) * (sphere_radius * 2)) * 100) / 100

            y_coordinate = Math.round((delta_y + delta_y + sphere_radius + ((i - 1) * sphere_radius * Math.sqrt(3))) * 100) / 100


            adatom_lattice += "<circle id=\""
            adatom_lattice += id_circle
            adatom_lattice += "\" class=\"c0\" cx=\""
            adatom_lattice += x_coordinate
            adatom_lattice += "\" cy=\""
            adatom_lattice += y_coordinate
            adatom_lattice += "\"  r=\""
            adatom_lattice += sphere_radius
            adatom_lattice += "\" />\n"



        }

    }

}


write_adatom_lattice();





// document.getElementById("the adatom lattice").innerHTML = adatom_lattice;











// initialize the number of visits tensor
// this has to be outside of a function especially the new Array commmand. Otherwise the array is undefined


let number_of_visits_tensor = new Array(NUMBER_OF_DIFFUSION_STEPS + 1);

let k,i,j;

for (k = 0; k <= NUMBER_OF_DIFFUSION_STEPS; k++) {

    number_of_visits_tensor[k] = new Array(NUMBER_OF_ROWS + 1);

    for ( i = 0; i <= NUMBER_OF_ROWS; i++) {

        number_of_visits_tensor[k][i] = new Array(NUMBER_OF_COLUMNS + 1)

    }
}

for (k = 0; k <= NUMBER_OF_DIFFUSION_STEPS; k++) {

    for (i = 0; i <= NUMBER_OF_ROWS; i++) {

        for (j = 0; j <= NUMBER_OF_COLUMNS; j++) {

            number_of_visits_tensor[k][i][j] = 0;

        }

    }

}




function random_1_6() {

    return (Math.floor(Math.random() * 6) + 1)

}





function i_periodic(i) {
    let  output ;

    if (i >= 1 && i <= NUMBER_OF_ROWS) {
        output = i;

    }

    if (i === 0) {
        output = NUMBER_OF_ROWS;
    }

    if (i === -1) {
        output = NUMBER_OF_ROWS - 1;
    }

    if (i === -2) {
        output = NUMBER_OF_ROWS - 2;
    }





    if (i === NUMBER_OF_ROWS + 1) {
        output = 1;
    }


    if (i === NUMBER_OF_ROWS + 2) {
        output = 2;
    }

    if (i === NUMBER_OF_ROWS + 3) {
        output = 3;
    }

    return output;

}




function j_periodic(j) {

    let output;

    if (j >= 1 && j <= NUMBER_OF_COLUMNS) {
        output = j;

    }

    if (j === 0) {
        output = NUMBER_OF_COLUMNS;
    }

    if (j === -1) {
        output = NUMBER_OF_COLUMNS - 1;
    }

    if (j === -2) {
        output = NUMBER_OF_COLUMNS - 2;
    }


    if (j === NUMBER_OF_COLUMNS + 1) {
        output = 1;
    }

    if (j === NUMBER_OF_COLUMNS + 2) {
        output = 2;
    }

    if (j === NUMBER_OF_COLUMNS + 3) {
        output = 3;
    }

    return output;

}



let diff1 = 0, diff2 = 0, diff3 = 0, diff4 = 0, diff5 = 0, diff6 = 0;



let the_adsorbate_trace = "";

function perform_one_diffusion_step(ka) {

    let i,j;

    let diffusion_direction;

    let x_coordinate_initial,y_coordinate_initial,x_coordinate_final,y_coordinate_final;

    let start_time_showing_actual_circle

   // var one_step_only;

    // uebertrage die alte Matrix auf die neue Stufe des Tensors

    for (i = 0; i <= NUMBER_OF_ROWS; i++) {

        for (j = 0; j <= NUMBER_OF_ROWS; j++) {

            number_of_visits_tensor[ka][i][j] = Math.round(number_of_visits_tensor[ka - 1][i][j]);

        }

    }



    diffusion_direction = random_1_6();


    start_time_showing_actual_circle = TIME_TO_START_DIFFUSION + ka * DISPLAY_TIME_FOR_ONE_DIFFUSION_STEP



   // x_coordinate_initial = Math.round((delta_x + delta_x + sphere_radius + ((j_initial - 1) + (i_initial - 1) / 2.0) * (sphere_radius * 2)) * 100) / 100

   // y_coordinate_initial = Math.round((delta_y + delta_y + sphere_radius + ((i_initial - 1) * sphere_radius * Math.sqrt(3))) * 100) / 100



    /*
    		diffusion_protocol += "initial state is "
    		diffusion_protocol += i_initial
    		diffusion_protocol += ","
    		diffusion_protocol += j_initial
    		diffusion_protocol += ", diffusion step is: "
    		diffusion_protocol += ka
    		diffusion_protocol += "  \n"
    */




    if (diffusion_direction === 1) {

        // diffusion direction 1
        //  i - >  i and j - > j+1

        i_final = i_periodic(i_initial);
        j_final = j_periodic(j_initial + 1);


        diff1 += 1


    }

    if (diffusion_direction === 2) {

        // diffusion direction 2
        //  i - > i-1 and j - > j+1


        i_final = i_periodic(i_initial - 1);
        j_final = j_periodic(j_initial + 1);



        diff2 += 1



    }

    if (diffusion_direction === 3) {

        // diffusion direction 3
        //  i - > i-1 and j - > j


        i_final = i_periodic(i_initial - 1);
        j_final = j_periodic(j_initial);


        diff3 += 1


    }

    if (diffusion_direction === 4) {

        // diffusion direction 4
        //  i - > i and j - > j-1


        i_final = i_periodic(i_initial);
        j_final = j_periodic(j_initial - 1);


        diff4 += 1


    }

    if (diffusion_direction === 5) {

        // diffusion direction 5
        //  i - > i+1 and j - > j-1


        i_final = i_periodic(i_initial + 1);
        j_final = j_periodic(j_initial - 1);


        diff5 += 1


    }

    if (diffusion_direction === 6) {

        // diffusion direction 6
        //  i - > i+1 and j - > j

        i_final = i_periodic(i_initial + 1);
        j_final = j_periodic(j_initial);



        diff6 += 1


    }


    /* very important */




    number_of_visits_tensor[ka][i_final][j_final] += 1;



    x_coordinate_initial = Math.round((delta_x + delta_x + sphere_radius + ((j_initial - 1) + (i_initial - 1) / 2.0) * (sphere_radius * 2)) * 100) / 100

    y_coordinate_initial = Math.round((delta_y + delta_y + sphere_radius + ((i_initial - 1) * sphere_radius * Math.sqrt(3))) * 100) / 100


    x_coordinate_final = Math.round((delta_x + delta_x + sphere_radius + ((j_final - 1) + (i_final - 1) / 2.0) * (sphere_radius * 2)) * 100) / 100

    y_coordinate_final = Math.round((delta_y + delta_y + sphere_radius + ((i_final - 1) * sphere_radius * Math.sqrt(3))) * 100) / 100



    the_adsorbate_trace += "<g style=\"visibility:hidden\" >\n"

    //one_step_only = "<g style=\"visibility:hidden\" >\n"

    the_adsorbate_trace += "<!-- diffusion step"

    //one_step_only += "<!-- diffusion step"

    the_adsorbate_trace += ka

    //one_step_only += ka

    the_adsorbate_trace += "--> \n"

    //one_step_only += "--> \n"



    if (i_initial === Math.round(NUMBER_OF_ROWS / 2) && j_initial === Math.round(NUMBER_OF_ROWS / 2)) {

        // this if is for nor not to overwrite the start point in the middle

        the_adsorbate_trace += "<!-- I was in center, so  circle for number of stays -->\n"

        //one_step_only += "<!-- I was in center, so no circle for number of stays -->\n"

    } else {


        the_adsorbate_trace += "<circle class=\"c"

        //one_step_only += "<circle class=\"c"



        if (number_of_visits_tensor[ka - 1][i_initial][j_initial] <= 9) {

            the_adsorbate_trace += Math.round(number_of_visits_tensor[ka - 1][i_initial][j_initial])

            //one_step_only += Math.round(number_of_visits_tensor[ka - 1][i - j_initial][j_initial])

        }

        if (number_of_visits_tensor[ka - 1][i_initial][j_initial] > 9) {

            the_adsorbate_trace += 9

            //one_step_only += 9

        }


        the_adsorbate_trace += "\" cx=\""

        //one_step_only += "\" cx=\""

        the_adsorbate_trace += x_coordinate_initial

        //one_step_only += x_coordinate_initial

        the_adsorbate_trace += "\"  cy=\""

        //one_step_only += "\"  cy=\""

        the_adsorbate_trace += y_coordinate_initial

        //one_step_only += y_coordinate_initial

        the_adsorbate_trace += "\" r=\""

        //one_step_only += "\" r=\""


        the_adsorbate_trace += sphere_radius

        //one_step_only += sphere_radius

        the_adsorbate_trace += "\" />\n"

        //one_step_only += "\" />\n"


        the_adsorbate_trace += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

        //one_step_only += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

        the_adsorbate_trace += start_time_showing_actual_circle

        //one_step_only += start_time_showing_actual_circle

        the_adsorbate_trace += "s\" fill=\"freeze\" />\n"

        //one_step_only += "s\" fill=\"freeze\" />\n"





    }





    if (i_final === Math.round(NUMBER_OF_ROWS / 2) && j_final === Math.round(NUMBER_OF_ROWS / 2)) {

        // this if is for nor not to overwrite the start point in the middle

        the_adsorbate_trace += "<!-- I was in center, so no actual circle -->\n"

      //  one_step_only += "<!-- I was in center, so no actual circle -->\n"

    } else {





        // this shows the actual position

        the_adsorbate_trace += "<use xlink:href=\"#actual circle\" x=\""

        //one_step_only += "<use xlink:href=\"#actual circle\" x=\""

        // this element shows the acutal circle

        the_adsorbate_trace += x_coordinate_final

        //one_step_only += x_coordinate_final

        the_adsorbate_trace += "\" y=\""

        //one_step_only += "\" y=\""

        the_adsorbate_trace += y_coordinate_final

        //one_step_only += y_coordinate_final

        the_adsorbate_trace += "\" style=\"opacity:1.0\" />\n"

        //one_step_only += "\" style=\"opacity:1.0\" />\n"

    }





    the_adsorbate_trace += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

   // //one_step_only += "<set attributeName=\"visibility\" attributeType=\"CSS\" to=\"visible\" begin=\""

    the_adsorbate_trace += start_time_showing_actual_circle

   // //one_step_only += start_time_showing_actual_circle

    the_adsorbate_trace += "s\" dur=\""

   // //one_step_only += "s\" dur=\""

    if (ka < NUMBER_OF_DIFFUSION_STEPS) {

        the_adsorbate_trace += DISPLAY_TIME_FOR_ONE_DIFFUSION_STEP

    }

    if (ka < NUMBER_OF_DIFFUSION_STEPS) {

        the_adsorbate_trace += "s\" />\n"


    }


    if (ka === NUMBER_OF_DIFFUSION_STEPS) {

        the_adsorbate_trace += "s\" fill=\"freeze\"/>\n"


    }

    the_adsorbate_trace += "</g>\n\n\n"


    mc_time += single_adsorbate_diffusion_time;


    if (ka === 5) {



    }




}


function perform_diffusion() {

    let check_sum = 0;

    let k;




    for (k = 1; k <= NUMBER_OF_DIFFUSION_STEPS; k++) {

        check_sum = 0;


        perform_one_diffusion_step(k)

        i_initial = i_final

        j_initial = j_final


    }


}


perform_diffusion()



document.getElementById("the trace of the adsorbate").innerHTML = the_adsorbate_trace;